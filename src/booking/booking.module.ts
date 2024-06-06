import { Module } from '@nestjs/common';
import { Slot } from 'src/slot-management/entities/slot.entities';
import { SlotManagementModule } from 'src/slot-management/slot-management.module';
import { BusinessModule } from 'src/business/business.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from 'src/notification/notification.module';
import { Booking } from './entities/booking.entities';
import { Business } from 'src/business/entities/business.entites';
import { User } from 'src/users/entities';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.services';

@Module({
  imports: [
    SlotManagementModule,
    BusinessModule,
    TypeOrmModule.forFeature([Booking, Slot, Business, User]),
    NotificationsModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
