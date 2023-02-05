import { Exclude } from 'class-transformer';
import { Role } from '../enums/role.enum';
import { Restaurant } from '../restaurant/restaurant.entity';
import { Review } from '../review/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({ select: false })
  password: string;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column()
  telephone_number: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Client,
  })
  role: Role;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  restaurants: Restaurant[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
