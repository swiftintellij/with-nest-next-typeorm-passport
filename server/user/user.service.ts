import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { toUserDto } from './user.mapper';
import { CreateUserDto } from './user.create.dto';
import { LoginUserDto } from './user.login.dto';
import Bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async create(userDto: CreateUserDto) {
        const { email } = userDto;

        const foundUser = await this.userRepository.findOne({ where: { email }});
        if (foundUser) {
            throw new HttpException("Existed User", HttpStatus.BAD_REQUEST);
        }

        const newUser = await this.userRepository.create(userDto).save();
        return toUserDto(newUser);
    }

    async login(userDto: LoginUserDto) {
        const { email, password } = userDto;

        console.log(email + ' ' + password);
        const user = await this.userRepository.findOne({ email: email});
        console.log(user);
        if (!user) {
            throw new HttpException("Not Found User", HttpStatus.UNAUTHORIZED);
        }
        console.log('check password')        
        const logged = await Bcrypt.compare(password, user.password);
        if (!logged) {
            throw new HttpException("Invalid User", HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        return toUserDto(user);
    }
}

