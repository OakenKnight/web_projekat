package repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Admin;

public class AdminRepository implements AdminRepositoryInterface{

	
	private ObjectMapper mapper;
	private File file;
	
	public AdminRepository(){
		mapper = new ObjectMapper();
		file = new File("data/admin.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
				saveAll(new ArrayList<Admin>());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	@Override
	public boolean create(Admin obj) {
		List<Admin> admins = getAll();
		if(admins != null && getObj(obj.getUsername()) == null) {
			admins.add(obj);
			return saveAll(admins);
		}
		return false;
	}

	@Override
	public boolean update(Admin obj) {
		List<Admin> admins = getAll();
		if(admins != null && getObj(obj.getUsername()) != null) {
			for(int i = 0; i < admins.size(); i++) {
				if(admins.get(i).getUsername().equals(obj.getUsername())) {
					admins.set(i, obj);
					return saveAll(admins);
				}
			}
		}
		return false;
	}

	@Override
	public boolean remove(String id) {
		List<Admin> admins = getAll();
		if(admins != null && getObj(id) != null) {
			admins.removeIf(admin -> admin.getUsername().equals(id));
			return saveAll(admins);
		}
		return false;
	}

	@Override
	public List<Admin> getAll() {
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Admin>>() {});
		} catch (IllegalArgumentException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Admin getObj(String id) {
		return getAll().stream().filter(admin -> admin.getUsername().equals(id)).findFirst().orElse(null);
	}

	@Override
	public boolean saveAll(List<Admin> objs){
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
