package beans;

import java.util.Date;

public class SearchedApartment {
    private String destination;
    private Date arriveDate;
    private Date departDate;
    private String numberOfGuests;
    private String minRooms;
    private String maxRooms;
    private String minPrice;
    private String maxPrice;

    public SearchedApartment(){}
    public SearchedApartment(String destination, Date arriveDate, Date departDate, String minRooms, String maxRooms ,String minimumPrice, String maximumPrice, String guests){
        this.destination=destination;
        this.arriveDate = arriveDate;
        this.departDate = departDate;
        this.minRooms=minRooms;
        this.maxRooms = maxRooms;
        this.minPrice=minimumPrice;
        this.maxPrice=maximumPrice;
        this.numberOfGuests = guests;
    }

    public String getDestination(){
        return destination;
    }

    public void setDestination(String destination){
        this.destination = destination;
    }

    public Date getArriveDate(){
        return arriveDate;
    }

    public void setArriveDate(Date arrivingDate){
        this.arriveDate = arrivingDate;
    }

    public Date getLeavingDate(){
        return departDate;
    }

    public void setLeavingDate(Date leavingDate){
        this.departDate = leavingDate;
    }

    public String getMinRooms(){
        return minRooms;
    }

    public void setMinRooms(String rooms){
        this.minRooms = rooms;
    }
    public String getMaxRooms(){
        return maxRooms;
    }

    public void setMaxRooms(String rooms){
        this.maxRooms= rooms;
    }
    public void setGuests(String guests){
        this.numberOfGuests = guests;
    }
    public String getGuests(){
        return numberOfGuests;
    }
    public String getMinimumPrice(){
        return minPrice;
    }

    public void setMinimumPrice(String minimumPrice){
        this.minPrice=minimumPrice;
    }

    public String getMaximumPrice(){
        return maxPrice;
    }

    public void setMaximumPrice(String maximumPrice){
        this.maxPrice=maximumPrice;
    }
    
    @Override

    public String toString(){
        return "[" +destination +","+ arriveDate+","+departDate+","+numberOfGuests+","+maxRooms+","+minRooms+","+minPrice+","+maxPrice+"]";
    }


}
