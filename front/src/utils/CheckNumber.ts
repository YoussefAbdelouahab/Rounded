export default function CheckNumber(number: string) {
    number = number.replace(/\s/g, '');
    if (/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(number) == true) {
        if (number[0] == "0") {
            return number.replace("0", "+33")
        } else {
            return number;
        }
    } else {
        return "error"
    }
}