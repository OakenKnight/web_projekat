package repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Amenity;

public class AmenityRepository implements AmenityRepositoryInterface{

	private ObjectMapper mapper;
	private File file;
	
	public AmenityRepository(){
		mapper = new ObjectMapper();
		file = new File("data/amenities.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
				saveAll(new ArrayList<Amenity>());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public boolean create(Amenity obj) {
		List<Amenity> amenities = getAll();
		if(amenities != null && getObj(obj.getId()) == null) {
			amenities.add(obj);
			return saveAll(amenities);
		}
		return false;
	}

	@Override
	public boolean update(Amenity obj) {
		List<Amenity> amenities = getAll();
		if(amenities != null && getObj(obj.getId()) != null) {
			for(int i = 0; i < amenities.size(); i++) {
				if(amenities.get(i).getId().equals(obj.getId())) {
					amenities.set(i, obj);
					return saveAll(amenities);
				}
			}
		}
		return false;
	}

	@Override
	public boolean remove(String id) {
		List<Amenity> amenities = getAll();
		if(amenities != null && getObj(id) != null) {
			amenities.removeIf(amenity -> amenity.getId().equals(id));
			return saveAll(amenities);
		}
		return false;
	}

	@Override
	public List<Amenity> getAll() {
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Amenity>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Amenity getObj(String id) {
		return getAll().stream().filter(amenity -> amenity.getId().equals(id)).findFirst().orElse(null);
	}

	@Override
	public boolean saveAll(List<Amenity> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
}
