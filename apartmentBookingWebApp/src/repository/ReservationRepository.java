package repository;

import java.io.File;
import java.io.IOException;
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
	}

	@Override
	public boolean create(Reservation obj) {
		List<Reservation> reservations = getAll();
		if(reservations != null && reservations.contains(obj)) {
			reservations.add(obj);
			return saveAll(reservations);
		}
		return false;
	}

	@Override
	public boolean update(Reservation obj) {
		List<Reservation> reservations = getAll();
		if(reservations != null && !reservations.contains(obj)) {
			reservations.set(reservations.indexOf(getObj(obj.getId())), obj);
			return saveAll(reservations);
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
			// TODO Auto-generated catch block
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
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		
	}
}
