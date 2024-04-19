export default function ConvertDuration(duration: any) {
    let min = Math.floor(duration / 60).toString();
    let secs = (duration % 60).toString();
    if (secs == "0") {
        duration = min + " min"
    } else if (min == "0") {
        duration = secs + " sec";
    } else {
        duration = min + " min " + secs + " sec"
    }
    return duration;
}