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

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  address: string;
  @Column()
  workinghours: string;
  @Column()
  category: string;
  @Column()
  photo: string;
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.restaurants, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Meal, (meal) => meal.restaurant)
  meals: Meal[];
}
