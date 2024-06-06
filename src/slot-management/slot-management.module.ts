import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entities';
import { User } from 'src/users/entities';
import { Business } from 'src/business/entities/business.entites';
import { SlotManagementService } from './slot-management.services';
import { SlotManagementController } from './slot-management.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Slot, User, Business])],
  controllers: [SlotManagementController],
  providers: [SlotManagementService],
  exports: [SlotManagementService],
})
export class SlotManagementModule {}
