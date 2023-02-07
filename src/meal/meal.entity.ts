import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  name: string;
  @Column()
  price: string;
  @Column()
  photo: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.meals)
  restaurant: Restaurant;
}
