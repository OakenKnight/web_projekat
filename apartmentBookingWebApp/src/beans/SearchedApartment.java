package beans;

import java.util.Date;

public class SearchedApartment {
    private String destination;
    private Date arriveDate;
    private Date departDate;
    private String numberOfGuests;
    private String minPrice;
    private String maxPrice;

    public SearchedApartment(){}
    public SearchedApartment(String destination, Date arriveDate, Date departDate, String numberOfGuests, String minimumPrice, String maximumPrice){
        this.destination=destination;
        this.arriveDate = arriveDate;
        this.departDate = departDate;
        this.numberOfGuests=numberOfGuests;
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

    public String getNumberOfGuests(){
        return numberOfGuests;
    }

    public void setNumberOfGuests(String numerOfGuests){
        this.numberOfGuests = numerOfGuests;
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
        return "[" +destination +","+ arriveDate+","+departDate+","+numberOfGuests+","+minPrice+","+maxPrice+"]";
    }


}
