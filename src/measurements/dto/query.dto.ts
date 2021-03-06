import { Allow } from 'class-validator';

export class QueryDto {
    @Allow()
    userId: number;
    @Allow()
    dosimeterId: number;
}
export default QueryDto;
