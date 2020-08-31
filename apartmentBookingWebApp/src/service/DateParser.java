package service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateParser {
    private DateFormat dateFormat ;
    
    public DateParser(){

        dateFormat= new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

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
}