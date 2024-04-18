import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, UseBefore, Patch } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Call } from '../entity/Call';

@JsonController()
export class CallController {

    private clientUrl = "http://localhost:8000";

    constructor(private CallController) {
        this.CallController = AppDataSource.getRepository(Call);
    }

    @Get('/call/:id')
    public async getOne(@Param('id') id: number) {
        try {
            const call: Call = await this.CallController.findOne({ where: { id } });
            if (!call) throw new Error('Call not found');
            return call;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/calls')
    public async getAllCalls() {
        try {
            const calls: Call = await this.CallController.find({ order: { id: "DESC" } });
            if (!calls) throw new Error('Calls not found');
            return calls;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Patch('/call/:id')
    public async update(@Param('id') id: number, @Body() data: Call) {
        try {
            const call: Call = await this.CallController.findOne({ where: { id } });
            if (!call) throw new Error('Call not found');

            await this.CallController.save({ ...call, ...data });

            return { success: "Call updated" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Delete('/user/:id')
    public async remove(@Param('id') id: number) {
        try {
            const call: Call = await this.CallController.findOne({ where: { id } });
            if (!call) throw new Error('Call not found');

            await this.CallController.remove(call);

            return { success: "Call deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }
}