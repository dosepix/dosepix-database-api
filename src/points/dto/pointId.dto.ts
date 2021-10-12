import { IsNotEmpty } from "class-validator";

export class PointIdDto {
    @IsNotEmpty()
    measurementId: number;
    @IsNotEmpty()
    time: number;
    @IsNotEmpty()
    dose: number;
}
export default PointIdDto;
