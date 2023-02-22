import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meal } from '../meal/meal.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity()
export class DailyMenu {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.dailymenus)
  restaurant: Restaurant;

  @ManyToMany(() => Meal)
  @JoinTable()
  meals: Meal[];
}
