import { Player } from './player.interface';

export interface RoomState {
  id: string;
  players: Map<string, Player>;
}
