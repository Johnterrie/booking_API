import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../enums/roles-enums';
import { Business } from 'src/business/entities/business.entites';
import { Booking } from 'src/booking/entities/booking.entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Client })
  role: Role;

  @OneToOne(() => Business, (business) => business.owner)
  business: Business;

  @ManyToOne(() => Business, (business) => business.employees)
  workplace: Business;

  @OneToMany(() => Booking, (bookings) => bookings.user)
  booking: Booking[];
}
