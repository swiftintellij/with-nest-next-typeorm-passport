import { Controller, Post, Body, HttpException, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.create.dto';
import { LoginUserDto } from '../user/user.login.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('join')
    async join(@Body() userDto: CreateUserDto) {
        const result = await this.authService.join(userDto);
        if (!result.status) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    async login(@Body() userDto: LoginUserDto) {
        return await this.authService.login(userDto);
    }

    @Get('wau')
    @UseGuards(AuthGuard())
    async whoareyou(@Req() request: Request) {
        return request.user
    }
}
