import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity';

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
  @Column()
  restaurantId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
