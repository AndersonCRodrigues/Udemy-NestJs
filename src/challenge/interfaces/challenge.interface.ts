import { Document } from 'mongoose';
import { ChallengeStatus } from './challenge.status.enum';
import { IPlayer } from 'src/players/interfaces/players.interface';

export interface IResult {
  set: string;
}

export interface IMatch extends Document {
  category: string;
  players: IPlayer[];
  def: IPlayer;
  result: IResult[];
}

export interface IChallenge extends Document {
  dateHourChallenge: Date;
  status: ChallengeStatus;
  dateHourRequest: Date;
  dateHourResponse: Date;
  requester: string;
  players: IPlayer[];
  match: IMatch;
}
