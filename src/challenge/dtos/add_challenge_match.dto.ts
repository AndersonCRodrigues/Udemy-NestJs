import { IsNotEmpty } from 'class-validator';
import { IPlayer } from 'src/players/interfaces/players.interface';
import { IResult } from '../interfaces/challenge.interface';

export class AddChallengeMatchDto {
  @IsNotEmpty()
  def: string;

  @IsNotEmpty()
  result: IResult[];
}
