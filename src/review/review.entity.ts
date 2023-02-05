import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  atmosphere: string;
  @Column()
  general_impression: string;
  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
