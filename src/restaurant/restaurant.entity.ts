import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meal } from '../meal/meal.entity';
import { Review } from '../review/review.entity';
import { DailyMenu } from '../daily-menu/daily-menu.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  workinghours: string;
  @Column()
  category: string;
  @Column()
  photo: string;
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.restaurants, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => DailyMenu, (dailymenu) => dailymenu.restaurant)
  dailymenus: DailyMenu[];

  @OneToMany(() => Meal, (meal) => meal.restaurant)
  meals: Meal[];

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
