import { Call } from '../entity/Call';

export default function MostFrequentSubject(calls: Call[]) {
    var frequency = {
        appointment: 0,
        information: 0,
        prescription: 0,
        other: 0
    };
    var result = "";

    calls.forEach(element => {
        switch (element.getSubject()) {
            case 'appointment':
                frequency.appointment++;
                break;
            case 'information':
                frequency.information++;
                break;
            case 'prescription':
                frequency.prescription++;
                break;
            case 'other':
                frequency.other++;
                break;
        }
    });

    var values = Object.values(frequency);
    var highestValue = Math.max.apply(null, values);

    Object.keys(frequency).forEach(function (element) {
        if (frequency[element] == highestValue) {
            result = `${element}`;
        }

    });
    return { frequency: frequency, result: result };
}
