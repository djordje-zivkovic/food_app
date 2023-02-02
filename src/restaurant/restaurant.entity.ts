import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
