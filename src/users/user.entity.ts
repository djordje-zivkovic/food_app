import { Role } from '../enums/role.enum';
import { Restaurant } from '../restaurant/restaurant.entity';
import { Review } from '../review/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../order/order.entity';

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
  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  restaurants: Restaurant[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
