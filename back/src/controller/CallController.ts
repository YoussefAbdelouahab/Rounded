import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, UseBefore, Patch } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import GetAllStatistics from '../statistics/AllStatistics';
import { Call } from '../entity/Call';

@JsonController()
export class CallController {

    private clientUrl = "http://localhost:8000";

    constructor(private CallController) {
        this.CallController = AppDataSource.getRepository(Call);
    }

    @Get('/init')
    public async initData() {
        try {
            var json = require("../../../data.json")
            json.forEach((element) => {
                this.CallController.save(element);
            });
            return { succes: "Data Stored" };
        } catch (err) {
            return { error: err.message }
        }
    }


    @Post('/call')
    public async create(@Body() data: Call) {
        try {
            const call: Call = data;
            if (!call) throw new Error('Call not created');

            await this.CallController.save(call);

            return { success: "Account created", call: call };
        } catch (err) {
            return { error: err.message }
        }
    }


    @Get('/calls')
    public async getAll() {
        try {
            var agents = [];
            const calls = await this.CallController.find({ order: { id: "DESC" } });
            calls.forEach(element => {
                if (!agents.includes(element.to)) {
                    agents.push(element.to)
                }
            });
            if (!calls) throw new Error('Calls not found');
            return agents;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/calls/:to')
    public async getAllOfOne(@Param('to') to: string) {
        try {
            const calls: Call[] = await this.CallController.find({ where: { to }, order: { date: "DESC" } });
            if (!calls) throw new Error('Calls not found');
            var statistics = GetAllStatistics(calls);
            return { calls: calls, statistics: statistics };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Patch('/call/:from')
    public async update(@Param('from') from: string, @Body() data: Call) {
        try {
            const call: Call = await this.CallController.findOne({ where: { from } });
            if (!call) throw new Error('Call not found');

            await this.CallController.save({ ...call, ...data });

            return { success: "Call updated" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Delete('/call/:from')
    public async remove(@Param('from') from: string) {
        try {
            const call: Call = await this.CallController.findOne({ where: { from } });
            if (!call) throw new Error('Call not found');

            await this.CallController.remove(call);

            return { success: "Call deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }
}


export default function AverageTimeSaved(calls: Call[]) {
    var days = [];
    var result = [{
        day: "",
        timeSaved: 0
    }];

    //Get all different days of the calls
    calls.forEach(element => {
        if (!days.includes(element.getDate().toISOString().split('T')[0])) {
            days.push(element.getDate().toISOString().split('T')[0]);
        }
    });

    //pass through all calls
    calls.forEach(element => {
        //define the day and subject of the call
        var day = element.getDate().toISOString().split('T')[0];
        var subject = element.getSubject();
        //set the time saved to 0
        var time = 0;
        //pass through all days saved
        days.forEach(element => {
            var alreadyExist = false
            if (day == element) {
                if (subject == "appointment") {
                    time = time + 5;
                } else {
                    time = time + 3;
                }

                result.forEach(element => {
                    //if the day already have a timeSaved, sum the times
                    if (element.day == day) {
                        element.timeSaved = element.timeSaved + time
                        alreadyExist = true;
                    }
                });
                //else just add the day with the new timeSaved
                if (!alreadyExist) {
                    result.push({ day: day, timeSaved: time })
                }

            }
        });
    });

    //Delete the first row of the array cause he is deprecated
    result = result.slice(1);
    return result
}
