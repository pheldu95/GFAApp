//file for any helper methods we might want in our application

//this will combine our values from our date and time inputs so we can 
//then send the combined values to be stored in our caughtDate column
export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00'

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    //will get the day of the month
    const day = date.getDate();
    //combine the date info
    const dateString= `${year}-${month}-${day}`;

    //combine the date info with the time string
    return new Date(dateString + ' ' + timeString);
}
