export default function FromatDate(date: string) {
    const time = new Date(date).toLocaleTimeString('en',
        { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
    var day = date.substring(0, 10)

    date = day + " " + time
    return date;
}