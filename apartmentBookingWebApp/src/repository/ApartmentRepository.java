package repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
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
		if(!file.exists()) {
			try {
				file.createNewFile();
				saveAll(new ArrayList<Apartment>());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public boolean create(Apartment obj) {
		List<Apartment> apartments = getAll();
		if(apartments != null && getObj(obj.getId()) == null) {
			apartments.add(obj);
			return saveAll(apartments);
		}
		return false;
	}

	@Override
	public boolean update(Apartment obj) {
		List<Apartment> apartments = getAll();
		if(apartments != null && getObj(obj.getId()) != null) {
			for(int i = 0; i < apartments.size(); i++) {
				if(apartments.get(i).getId().equals(obj.getId())) {
					apartments.set(i, obj);
					return saveAll(apartments);
				}
			}
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
			List<Apartment> apartments = new ArrayList<Apartment>();
			List<Apartment> allApartments = mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Apartment>>() {});
			for(Apartment a : allApartments) {
				if(a.getDeleted() == false) {
					apartments.add(a);
				}
			}
			return apartments;
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Apartment getObj(String id) {
		return getAll().stream().filter(apartment -> apartment.getId().equals(id) && apartment.getDeleted() == false).findFirst().orElse(null);
	}

	@Override
	public boolean saveAll(List<Apartment> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
}
