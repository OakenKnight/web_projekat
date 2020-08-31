package beans;


public class SearchedApartment {
    private String destination;
    private String arriveDate;
    private String departDate;
    private String numberOfGuests;
    private String minPrice;
    private String maxPrice;

    public SearchedApartment(){}
    public SearchedApartment(String destination, String arriveDate, String departDate, String numberOfGuests, String minimumPrice, String maximumPrice){
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

    public String getArriveDate(){
        return arriveDate;
    }

    public void setArriveDate(String arrivingDate){
        this.arriveDate = arrivingDate;
    }

    public String getLeavingDate(){
        return departDate;
    }

    public void setLeavingDate(String leavingDate){
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
