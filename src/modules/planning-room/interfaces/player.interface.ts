export type VoteValue = string | number | null;

export interface Player {
  id: string;
  uid: string;
  name: string;
  photoUrl?: string;
  joinedAt: number;
}
