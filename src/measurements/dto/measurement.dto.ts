import { User } from "../../users/user.entity";
import { Dosimeter } from "../../dosimeters/dosimeter.entity";

export class MeasurementDto {
    user: User;
    dosimeter: Dosimeter;
}
export default MeasurementDto;
