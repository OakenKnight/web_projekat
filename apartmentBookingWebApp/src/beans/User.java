package beans;



public class User {
	private String id;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private Gender gender;

	
	public User() {}
	
	public User(String username, String password, String firstName, String lastName, Gender gender) {
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}
	
	public void setGender(String gender) {
		if(gender == "MALE")
			this.gender = Gender.MALE;
		else
			this.gender = Gender.FEMALE;
	}
	
	
	
	
}
