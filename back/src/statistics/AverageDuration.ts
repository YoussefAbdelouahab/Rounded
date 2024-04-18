import { Call } from '../entity/Call';

export default function AverageDuration(calls: Call[]) {
    var result = 0;
    var i = 0;

    calls.forEach(element => {
        result = result + element.getDuration();
        i++
    });

    return { result: result / i };
}