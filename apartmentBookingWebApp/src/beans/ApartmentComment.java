package beans;

public class ApartmentComment {
	/*
	 * 
	 *Komentar ne sadrzi na koji se apartman odnosi jer
	 *sam apartman vec ima listu komentara
	 *
	 *Ne cuva se ceo guest nego samo njegov id
	 *
	 */
	private String id;
	private String guestId;
	private String text;
	private int reviewsMark;
	private boolean disabledForGuests;
	
	public ApartmentComment() {}
	
	public ApartmentComment(String guestId, String text, int reviewsMark, boolean disabledForGuests) {
		super();
		this.guestId = guestId;
		this.text = text;
		this.reviewsMark = reviewsMark;
		this.disabledForGuests = disabledForGuests;
	}

	
	
	public boolean isDisabledForGuests() {
		return disabledForGuests;
	}

	public void setDisabledForGuests(boolean disabledForGuests) {
		this.disabledForGuests = disabledForGuests;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getGuestId() {
		return guestId;
	}

	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getReviewsMark() {
		return reviewsMark;
	}

	public void setReviewsMark(int reviewsMark) {
		this.reviewsMark = reviewsMark;
	}
	
	
	
	
}
