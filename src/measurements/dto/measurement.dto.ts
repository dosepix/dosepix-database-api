import { IsNotEmpty } from 'class-validator';
import { User } from "../../users/user.entity";
import { Dosimeter } from "../../dosimeters/dosimeter.entity";

export class MeasurementDto {
    @IsNotEmpty()
    user: User;
    @IsNotEmpty()
    dosimeter: Dosimeter;
}
export default MeasurementDto;
