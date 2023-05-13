import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ChallengeStatus } from '../interfaces/challenge.status.enum';

export class UpdateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  dateHourChallenge: Date;

  @IsOptional()
  status: ChallengeStatus;
}
