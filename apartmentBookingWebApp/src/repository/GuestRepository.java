package repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Admin;
import beans.Guest;
import beans.User;

public class GuestRepository implements GuestRepositoryInterface{

	private ObjectMapper mapper;
	private File file;
	
	public GuestRepository(){
		mapper = new ObjectMapper();
		file = new File("data/guest.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
				saveAll(new ArrayList<Guest>());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	@Override
	public boolean create(Guest obj) {
		List<Guest> guests = getAll();
		if(guests != null && getObj(obj.getUsername()) == null) {
			guests.add(obj);
			return saveAll(guests);
		}
		return false;
	}

	@Override
	public boolean update(Guest obj) {
		List<Guest> guests = getAll();
		if(guests != null && getObj(obj.getUsername()) != null) {
			for(int i = 0; i < guests.size(); i++) {
				if(guests.get(i).getUsername().equals(obj.getUsername())) {
					guests.set(i, obj);
					return saveAll(guests);
				}
			}
		}
		return false;
	}

	@Override
	public boolean remove(String id) {
		List<Guest> guests = getAll();
		if(guests != null && getObj(id) != null) {
			guests.removeIf(guest -> guest.getUsername().equals(id));
			return saveAll(guests);
		}
		return false;
	}

	@Override
	public List<Guest> getAll() {
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<User>>() {});
		} catch (IllegalArgumentException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Guest getObj(String id) {
		return getAll().stream().filter(guest -> guest.getUsername().equals(id)).findFirst().orElse(null);
	}

	@Override
	public boolean saveAll(List<Guest> objs){
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
