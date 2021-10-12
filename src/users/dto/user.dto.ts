import { IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    fullName: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}
export default UserDto;
