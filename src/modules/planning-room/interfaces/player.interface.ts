export type VoteValue = string | number | null;

export interface Player {
  id: string;
  name: string;
  vote: VoteValue;
  joinedAt: number;
}
