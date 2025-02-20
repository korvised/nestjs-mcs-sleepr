import { IsDate, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
