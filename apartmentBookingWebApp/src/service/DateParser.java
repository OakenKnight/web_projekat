package service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateParser {
    private SimpleDateFormat dateFormat ;
    
    public DateParser(){

        dateFormat= new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        //dateFormat= new SimpleDateFormat("dd/MM/yyyy");

    }

    public Date parseDate(String date){
        try
        {
            return dateFormat.parse(date);
        }catch(ParseException p1){
            p1.printStackTrace();
            return null;
        }
    }

    public Date formatDate(Date date){
        Calendar calendar = GregorianCalendar.getInstance(); // creates a new calendar instance
        calendar.setTime(date);   // assigns calendar to given date 

        Date formatedDate = new Date(date.getTime() - calendar.get(Calendar.HOUR_OF_DAY)*3600000 - calendar.get(Calendar.MINUTE)*60000);

        return formatedDate;
    }

    public int getDaysBetween(Date arriveDate, Date departDate){
        Date arrive_date = formatDate(arriveDate);
        Date depart_date = formatDate(departDate);

        return  (int) (departDate.getTime() - arriveDate.getTime())/86400000 + 1;
    }
}