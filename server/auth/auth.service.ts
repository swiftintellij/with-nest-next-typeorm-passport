import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/user.create.dto';
import { LoginUserDto } from '../user/user.login.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async join(userDto: CreateUserDto) {
        try {
            await this.userService.create(userDto);
        } catch (error) {
            return {
                status: false,
                message: error
            }
        }

        return {
            status: true,
            message: "Successfully joined"
        }
    }

    async login(userDto: LoginUserDto) {
        const user = await this.userService.login(userDto);
        const payload: JwtPayload = {
            email: user.email
        }
        const accessToken = this.jwtService.sign(payload)
        return {
            email: user.email,
            accessToken: accessToken,
            expiresIn: process.env.EXPIRESIN
        }
    }

    async validateUser(payload: JwtPayload) {
        const user = await this.userService.findByEmail(payload.email);

        if (!user) {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
