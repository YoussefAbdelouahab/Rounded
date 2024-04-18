import { Call } from '../entity/Call';
import AverageDuration from "./AverageDuration"
import DifferentFrom from './DifferentFrom';
import MostFrequentSubject from './MostFrequentSubject';
import AverageTimeSaved from '../controller/CallController';

export default function GetAllStatistics(calls: Call[]) {
    var result;
    result = { ...result, AverageDuration: AverageDuration(calls), DifferentFrom: DifferentFrom(calls), MostFrequentSubject: MostFrequentSubject(calls), AverageTimeSaved: AverageTimeSaved(calls) };
    return result;
}