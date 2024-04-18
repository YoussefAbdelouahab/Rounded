import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, UseBefore, Patch } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { User } from '../entity/User';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

@JsonController()
export class UserController {

    private clientUrl = "http://localhost:8000";

    constructor(private userRepository) {
        this.userRepository = AppDataSource.getRepository(User);
    }

    @Post("/register")
    public async register(@Body() data: User) {
        try {
            // verif object existing in data source
            const hasAccountWithEmail: User = await this.userRepository.findOne({ where: { mail: data.getMail() } });
            const hasAccountWithUsername: User = await this.userRepository.findOne({ where: { username: data.getUsername() } });
            if (hasAccountWithEmail || hasAccountWithUsername) throw new Error('Account existing. Please Login');

            // hash password
            const hash = await bcrypt.hash(data.getPassword(), 10);

            // create object with condition
            const user: User = data;
            if (!user) throw new Error('Account not created');
            user.setPassword(hash);

            await this.userRepository.save(user);

            return { success: "Account created" };
        } catch (error) {
            return { error: error.message };
        }
    }

    @Post("/login")
    public async login(@Body() data: User, @Req() req: any) {
        try {
            // find object in data source
            const user: User = await this.userRepository.findOne({ where: { mail: data.getMail() } });
            if (!user) throw new Error('Account not found');

            // check if password conform
            const isValid = await bcrypt.compare(data.getPassword(), user.getPassword());
            if (!isValid) throw new Error('Identifiant/password incorrect');

            req.session.token = jwt.sign({
                id: user.getId(),
                roles: user.getRoles(),
            }, "bc042227-9f88-414d", {
                expiresIn: "24h"
            });

            if (!req.session.token) throw new Error('Error authentication');

            return { success: "Account login" };

        } catch (error) {
            return { error: error.message };
        }
    }

    @Delete("/logout")
    public async logout(@Req() req: any) {
        try {
            if (!req.session.token) throw new Error('Unable to logout');

            req.session.destroy();

            return { success: "Logout with success" };
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get('/user/:id')
    public async getOne(@Param('id') id: number) {
        try {
            const user: User = await this.userRepository.findOne({ where: { id } });
            if (!user) throw new Error('Account not found');
            return user;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Get('/users')
    public async getAllUsers() {
        try {
            const users: User = await this.userRepository.find({ order: { id: "DESC" } });
            if (!users) throw new Error('Users not found');
            return users;
        } catch (err) {
            return { error: err.message }
        }
    }

    @Patch('/user/:id/:username')
    public async update(@Param('id') id: string, @Param('username') username: string, @Body() data: User) {
        try {
            const user: User = await this.userRepository.findOne({ where: { id, username } });
            if (!user) throw new Error('Account not found');

            if (data.getPassword() != undefined) {
                // hash password
                const hash = await bcrypt.hash(data.getPassword(), 10);
                if (!user) throw new Error('Account not updated');
                user.setPassword(hash);

                await this.userRepository.save(user);
            } else {
                await this.userRepository.save({ ...user, ...data });
            }

            return { success: "Account updated" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Delete('/user/:id/:username')
    public async remove(@Param('id') id: string, @Param('username') username: string) {
        try {
            const user: User = await this.userRepository.findOne({ where: { id, username } });
            if (!user) throw new Error('Account not found');
            await this.userRepository.remove(user);
            return { success: "Account deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }

    @Post("/requestResetPassword")
    public async requestResetPassword(@Body() data: User, @Req() req: any) {
        try {
            const user: User = await this.userRepository.findOne({ where: { mail: data.getMail() } });
            if (!user) throw new Error('Account not found');

            let resetToken = crypto.randomBytes(32).toString("hex");
            const hash = await bcrypt.hash(resetToken, 10);

            req.session.token = hash;

            // url page reset password
            const link = `${this.clientUrl}/passwordReset?token=${resetToken}&id=${user.getId()}`;
            return link;

        } catch (error) {
            return { error: error.message };
        }
    }

    @Patch("/resetPassword")
    public async resetPassword(@Body() data: any, @Req() req: any) {
        try {
            let passwordResetToken = await req.session.token;
            if (!passwordResetToken) throw new Error('Invalid or expired password reset token');

            const isValid = await bcrypt.compare(data.token, passwordResetToken);
            if (!isValid) throw new Error('Invalid or expired password reset token');

            const hash = await bcrypt.hash(data.password, 10);

            const user: User = await this.userRepository.findOne({ where: { id: data.id } });
            if (!user) throw new Error('Account not found');
            user.setPassword(hash);

            await this.userRepository.save(user);

            return { success: "Password reset" };
        } catch (error) {
            return { error: error.message };
        }
    }
}