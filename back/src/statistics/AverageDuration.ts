import { Call } from '../entity/Call';

export default function AverageDuration(calls: Call[]) {
    var result: number = 0;
    var i = 0;

    calls.forEach(element => {
        result = result + element.getDuration();
        i++
    });
    return { result: Math.trunc(result / i) };
}