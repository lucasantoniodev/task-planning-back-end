export type VoteValue = string | number | null;

export interface Player {
  id: string;
  name: string;
  photoUrl?: string;
  joinedAt: number;
}
