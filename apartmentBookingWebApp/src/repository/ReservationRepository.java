package repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Reservation;

public class ReservationRepository implements ReservationRepositoryInterface{

	
	private ObjectMapper mapper;
	private File file;
	
	public ReservationRepository(){
		mapper = new ObjectMapper();
		file = new File("data/reservation.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
				saveAll(new ArrayList<Reservation>());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public boolean create(Reservation obj) {
		List<Reservation> reservations = getAll();
		if(reservations != null && getObj(obj.getId()) == null) {
			reservations.add(obj);
			return saveAll(reservations);
		}
		return false;
	}

	@Override
	public boolean update(Reservation obj) {
		List<Reservation> reservations = getAll();
		if(reservations != null && getObj(obj.getId()) != null) {
			for(int i = 0; i < reservations.size(); i++) {
				if(reservations.get(i).getId().equals(obj.getId())) {
					reservations.set(i, obj);
					return saveAll(reservations);
				}
			}
		}
		return false;
	}

	@Override
	public boolean remove(String id) {
		List<Reservation> reservations= getAll();
		if(reservations!= null && getObj(id) != null) {
			reservations.removeIf(reservation -> reservation.getId().equals(id));
			return saveAll(reservations);
		}
		return false;
	}

	@Override
	public List<Reservation> getAll() {
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Reservation>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Reservation getObj(String id) {
		return getAll().stream().filter(reservation -> reservation.getId().equals(id)).findFirst().orElse(null);
	}

	@Override
	public boolean saveAll(List<Reservation> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
}
