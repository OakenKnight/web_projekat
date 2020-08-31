package beans;

import java.util.Date;


public class ApartmentDTO {
    private String destination;
    private Date arriveDate;
    private Date departDate;
    private int numerOfGuests;
    private int minPrice;
    private int maxPrice;

    public ApartmentDTO(){}
    public ApartmentDTO(String destination, Date arriveDate, Date departDate, int numberOfGuests, int minimumPrice, int maximumPrice){
        this.destination=destination;
        this.arriveDate = arriveDate;
        this.departDate = departDate;
        this.numerOfGuests=numberOfGuests;
        this.minPrice=minimumPrice;
        this.maxPrice=maximumPrice;
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

    public int getNumberOfGuests(){
        return numerOfGuests;
    }

    public void setNumberOfGuests(int numerOfGuests){
        this.numerOfGuests = numerOfGuests;
    }

    public int getMinimumPrice(){
        return minPrice;
    }

    public void setMinimumPrice(int minimumPrice){
        this.minPrice=minimumPrice;
    }

    public int getMaximumPrice(){
        return maxPrice;
    }

    public void setMaximumPrice(int maximumPrice){
        this.maxPrice=maximumPrice;
    }
    



}
