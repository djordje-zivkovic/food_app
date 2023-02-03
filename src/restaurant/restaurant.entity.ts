import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.restaurants)
  user: User;
}
