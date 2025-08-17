import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserEntity {
  @Expose()
  id: string;

  @Expose()
  uid: string;

  @Expose()
  name: string;

  @Expose()
  email?: string;

  @Expose()
  coins: number;
}
