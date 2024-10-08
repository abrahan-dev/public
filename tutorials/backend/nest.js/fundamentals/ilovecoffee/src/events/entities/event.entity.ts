import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['type', 'name'])
@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
