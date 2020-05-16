import { User } from "./user.entity";
import { UserDto } from "./user.dto";

export const toUserDto = (data: User | any) => {
    const { id, name, email } = data;

    const userDto: UserDto = {
        id,
        name,
        email,
    };

    return userDto;
};