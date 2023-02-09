import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DailyMenu } from '../daily-menu/daily-menu.entity';
import { Meal } from '../meal/meal.entity';
import { User } from '../users/user.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: string;
  @Column()
  portions: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Meal)
  @JoinTable()
  dailyMenus: DailyMenu[];
}
