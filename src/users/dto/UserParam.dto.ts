import { IsNumber } from 'class-validator';

export class UserParamDto {
  @IsNumber()
  id: number;
}
