import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DailyMenu } from '../daily-menu/daily-menu.entity';
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
  @Column()
  category: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.meals)
  restaurant: Restaurant;
}
