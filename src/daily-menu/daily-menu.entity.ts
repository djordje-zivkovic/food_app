import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DailyMenu {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  date: string;
}
