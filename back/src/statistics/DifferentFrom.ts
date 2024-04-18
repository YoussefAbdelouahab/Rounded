import { Call } from '../entity/Call';

export default function DifferentFrom(calls: Call[]) {
    var nums = []

    calls.forEach(element => {
        var from = element.getFrom();
        if (!nums.includes(from)) {
            nums.push(from);
        }
    });

    var result = nums.length
    return { nums: nums, result: result };
}