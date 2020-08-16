package service;

import java.util.ArrayList;

import beans.Admin;
import beans.Guest;
import beans.Housekeeper;
import beans.User;
import beans.UserType;
import repository.AdminRepository;
import repository.GuestRepository;
import repository.HousekeeperRepository;

public class UserService {
	private AdminRepository adminRepository;
	private GuestRepository guestRepository;
	private HousekeeperRepository housekeeperRepository;
	
	public UserService() {
		this.adminRepository = new AdminRepository();
		this.guestRepository = new GuestRepository();
		this.housekeeperRepository = new HousekeeperRepository();
	}
	
	
	public User login(String username, String password) {
		User user = findAnyTypeOfUser(username);
		if(user.getPassword().equals(password)) return user;
		else return null;
	}
	
	public Guest registerNewGuest(User user) {
		if(findAnyTypeOfUser(user.getUsername()) == null) {
			Guest guest = new Guest(user, new ArrayList<String>(), new ArrayList<String>());
			if(guestRepository.create(guest)) {
				return guest;
			}
		}
		return null;
	}
	
	public boolean resetPassword(String username, String password) {
		User user = findAnyTypeOfUser(username);
		if(user.getUserType() == UserType.ADMIN) return resetAdminsPassword(username, password);
		else if (user.getUserType() == UserType.HOUSEKEEPER) return resetHousekeepersPassword(username, password);
		else if (user.getUserType() == UserType.GUEST) return resetGuestsPassword(username, password);
		else return false;
	}
	
	private boolean resetGuestsPassword(String username, String password) {
		Guest guest = guestRepository.getObj(username);
		guest.setPassword(password);
		return guestRepository.update(guest);
	}


	private boolean resetHousekeepersPassword(String username, String password) {
		Housekeeper housekeeper = housekeeperRepository.getObj(username);
		housekeeper.setPassword(password);
		return housekeeperRepository.update(housekeeper);
	}


	private boolean resetAdminsPassword(String username, String password) {
		Admin admin = adminRepository.getObj(username);
		admin.setPassword(password);
		return adminRepository.update(admin);
	}


	public User findAnyTypeOfUser(String username) {
		Admin admin = adminRepository.getObj(username);
		Housekeeper housekeeper = housekeeperRepository.getObj(username);
		Guest guest = guestRepository.getObj(username);
		
		if (admin != null) return (User)admin;
		else if (housekeeper != null) return (User)housekeeper;
		else if (guest != null) return (User)guest;
		else return null;
	}
	
	

}
