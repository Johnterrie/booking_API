import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities';
import { Business } from 'src/business/entities/business.entites';
import { Expose } from 'class-transformer';
import { Slot } from 'src/slot-management/entities/slot.entities';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Expose()
  @Column()
  book_slot: Date;

  @ManyToOne(() => Business, (business) => business.slots)
  business: Business;

  @ManyToOne(() => User, (users) => users.booking)
  user: User;

  @OneToOne(() => Slot, (slot) => slot.booking_by)
  slot: Slot;
}
