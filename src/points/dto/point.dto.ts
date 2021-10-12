import { IsNotEmpty } from 'class-validator';
import { Measurement } from "../../measurements/measurement.entity";

export class PointDto {
    @IsNotEmpty()
    measurement: Measurement;
    @IsNotEmpty()
    time: number;
    @IsNotEmpty()
    dose: number;
}
export default PointDto;
