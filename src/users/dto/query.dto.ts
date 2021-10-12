import { Allow } from 'class-validator';

export class QueryDto {
    @Allow()
    name: string;
    @Allow()
    fullName: string;
    @Allow()
    email: string;
}
export default QueryDto;
