import { IsNotEmpty } from 'class-validator';

export class DosimeterDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    color: string;
}
export default DosimeterDto;
