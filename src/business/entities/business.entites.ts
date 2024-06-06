import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities';
import { Slot } from 'src/slot-management/entities/slot.entities';
import { Location } from './location.entity';

@Entity()
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column('text')
  address: string;

  @OneToOne(() => Location, (location: Location) => location.business_id)
  @JoinColumn()
  coords: Location;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @OneToOne(() => User, (user: User) => user.business, { eager: true })
  owner: User;

  @OneToMany(() => User, (user: User) => user.workplace, { eager: true })
  employees: User[];

  @OneToMany(() => Slot, (dailySlots: Slot) => dailySlots.business, {
    eager: true,
  })
  slots: Slot[];

  @Column({ default: false })
  featured: boolean;
}
