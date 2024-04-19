export default function ConvertNumber(number: string) {
    var splited = number.split("+33");
    number = "0" + splited[1];
    var parts = number.match(/.{1,2}/g);
    if (parts != null) {
        var number = parts.join(" "); //returns 123-456-789
    }

    return number
}