import { Allow } from 'class-validator';

export class QueryDto {
    @Allow()
    measurementId: number;
    @Allow()
    time: number;
    @Allow()
    dose: number;
}
export default QueryDto;
