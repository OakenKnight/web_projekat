package repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Guest;
import beans.Housekeeper;

public class HousekeeperRepository implements HousekeeperRepositoryInterface{
	
	private ObjectMapper mapper;
	private File file;
	
	public HousekeeperRepository(){
		mapper = new ObjectMapper();
		file = new File("data/housekeeper.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
				saveAll(new ArrayList<Housekeeper>());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	@Override
	public boolean create(Housekeeper obj) {
		List<Housekeeper> housekeepers = getAll();
		if(housekeepers != null && getObj(obj.getUsername()) == null) {
			housekeepers.add(obj);
			return saveAll(housekeepers);
		}
		return false;
	}

	@Override
	public boolean update(Housekeeper obj) {
		List<Housekeeper> housekeepers = getAll();
		if(housekeepers != null && getObj(obj.getUsername()) != null) {
			for(int i = 0; i < housekeepers.size(); i++) {
				if(housekeepers.get(i).getUsername().equals(obj.getUsername())) {
					housekeepers.set(i, obj);
					return saveAll(housekeepers);
				}
			}
		}
		return false;
	}

	@Override
	public boolean remove(String id) {
		List<Housekeeper> housekeepers = getAll();
		if(housekeepers != null && getObj(id) != null) {
			housekeepers.removeIf(housekeeper -> housekeeper.getUsername().equals(id));
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
		return getAll().stream().filter(housekeeper -> housekeeper.getUsername().equals(id)).findFirst().orElse(null);
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
