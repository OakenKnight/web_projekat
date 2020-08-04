package repository;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Apartment;

public class ApartmentRepository implements ApartmentRepositoryInterface{

	private ObjectMapper mapper;
	private File file;
	
	public ApartmentRepository(){
		mapper = new ObjectMapper();
		file = new File("data/apartment.json");
	}

	@Override
	public boolean create(Apartment obj) {
		List<Apartment> apartments = getAll();
		if(apartments != null && apartments.contains(obj)) {
			apartments.add(obj);
			return saveAll(apartments);
		}
		return false;
	}

	@Override
	public boolean update(Apartment obj) {
		List<Apartment> apartments = getAll();
		if(apartments != null && !apartments.contains(obj)) {
			apartments.set(apartments.indexOf(getObj(obj.getId())), obj);
			return saveAll(apartments);
		}
		return false;
	}

	@Override
	public boolean remove(String id) {
		List<Apartment> apartments = getAll();
		if(apartments != null && getObj(id) != null) {
			apartments.removeIf(apartment -> apartment.getId().equals(id));
			return saveAll(apartments);
		}
		return false;
	}

	@Override
	public List<Apartment> getAll() {
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Apartment>>() {});
		} catch (IllegalArgumentException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Apartment getObj(String id) {
		return getAll().stream().filter(apartment -> apartment.getId().equals(id)).findFirst().orElse(null);
	}

	@Override
	public boolean saveAll(List<Apartment> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		
	}
}
