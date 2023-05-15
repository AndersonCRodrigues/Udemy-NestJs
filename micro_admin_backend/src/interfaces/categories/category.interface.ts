import { Document } from 'mongoose';
import { IPlayer } from '../players/players.interface';

export type Event = {
  name: string;
  operation: string;
  value: number;
};

export interface ICategory extends Document {
  readonly category: string;
  description: string;
  events: Event[];
  players: IPlayer[];
}
