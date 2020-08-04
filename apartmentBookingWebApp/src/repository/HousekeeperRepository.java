package repository;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import beans.Housekeeper;

public class HousekeeperRepository implements HousekeeperRepositoryInterface{
	
	private ObjectMapper mapper;
	private File file;
	
	public HousekeeperRepository(){
		mapper = new ObjectMapper();
		file = new File("data/housekeeper.json");
	}

	@Override
	public boolean create(Housekeeper obj) {
		List<Housekeeper> housekeepers = getAll();
		if(housekeepers != null && housekeepers.contains(obj)) {
			housekeepers.add(obj);
			return saveAll(housekeepers);
		}
		return false;
	}

	@Override
	public boolean update(Housekeeper obj) {
		List<Housekeeper> housekeepers = getAll();
		if(housekeepers != null && !housekeepers.contains(obj)) {
			housekeepers.set(housekeepers.indexOf(getObj(obj.getId())), obj);
			return saveAll(housekeepers);
		}
		return false;
	}

	@Override
	public boolean remove(String id) {
		List<Housekeeper> housekeepers = getAll();
		if(housekeepers != null && getObj(id) != null) {
			housekeepers.removeIf(housekeeper -> housekeeper.getId().equals(id));
			return saveAll(housekeepers);
		}
		return false;
	}

	@Override
	public List<Housekeeper> getAll() {
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Housekeeper>>() {});
		} catch (IllegalArgumentException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Housekeeper getObj(String id) {
		return getAll().stream().filter(housekeeper -> housekeeper.getId().equals(id)).findFirst().orElse(null);
	}

	@Override
	public boolean saveAll(List<Housekeeper> objs){
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
