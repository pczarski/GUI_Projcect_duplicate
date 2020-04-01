export function prefix0(dateInt) {
    if(dateInt <= 9) {
        return "0" + dateInt;
    }
    return dateInt;
}