export function getHours(dateInt) {
    if(dateInt <= 9) {
        return "0" + dateInt;
    }
    return dateInt;
}