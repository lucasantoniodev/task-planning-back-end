import { Player } from './player.interface';

export interface RoomState {
  id: string;
  revealed: boolean;
  story?: string;
  players: Map<string, Player>;
}
