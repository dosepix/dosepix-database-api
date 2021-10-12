import { Allow } from 'class-validator';

export class MeasurementIdDto {
    @Allow()
    userId: number;
    @Allow()
    dosimeterId: number;
}
export default MeasurementIdDto;
