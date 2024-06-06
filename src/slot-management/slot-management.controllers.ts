import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SlotManagementService } from './slot-management.services';
import { DailySlotsDto } from './dtos/dailySlots.dtos';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/users/enums/roles-enums';
import { Slot } from './entities/slot.entities';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { WeeklySlotsDto } from './dtos/weeklySlots.dto';
import { ActiveUserData } from 'src/iam/interface/active-user-data.interface';
import { UpdateDailySlotsDto } from './dtos/updateDailySlots.dto';
import { ReportDatesDto } from './dtos/reportDates.dto';

@ApiBearerAuth()
@Roles(Role.Business, Role.Employee, Role.Admin)
@ApiTags('Slots Management')
@Controller('slots')
export class SlotManagementController {
  constructor(private readonly slotManagementService: SlotManagementService) {}

  @ApiBody({ type: DailySlotsDto })
  @Post('daily')
  setDailySlots(
    @Body() dailySlotsDto: DailySlotsDto,
    @ActiveUser() user: ActiveUserData,
  ): Promise<Slot[]> {
    return this.slotManagementService.setDailySlots(dailySlotsDto, user);
  }

  @ApiBody({ type: WeeklySlotsDto })
  @Post('weekly')
  async setWeeklySlots(
    @Body() weeklySlotsDto: WeeklySlotsDto,
    @ActiveUser() currentUser: ActiveUserData,
  ): Promise<Slot[]> {
    return await this.slotManagementService.setWeeklySlots(
      weeklySlotsDto,
      currentUser,
    );
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserData): Promise<Slot[]> {
    return this.slotManagementService.findAllSlots(user);
  }

  @ApiOperation({ summary: 'Date must be formatted by YYYY-MM-DD' })
  @Get(':date')
  async GetOpenedSlotByDay(
    @Param('date') date: string,
    @ActiveUser() user: ActiveUserData,
  ): Promise<Slot[]> {
    return this.slotManagementService.getOpenedSlotByDay(date, user);
  }

  @ApiOperation({ summary: 'Date must be formatted by YYYY-MM-DD' })
  @ApiResponse({ status: 204, description: 'The date successfully closed' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':date')
  async getAndDeleteOpenedSlotsByDate(
    @Param('date') date: string,
    @ActiveUser() user: ActiveUserData,
  ): Promise<void> {
    return await this.slotManagementService.closeOpenedSlotsByDate(date, user);
  }

  @ApiOperation({ summary: 'Date must be formatted by YYYY-MM-DD' })
  @ApiResponse({ status: 200, description: 'The date successfully updated' })
  @HttpCode(HttpStatus.OK)
  @Patch(':date')
  async updateDailySlots(
    @Param('date') date: string,
    @Body() updateSlot: UpdateDailySlotsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.slotManagementService.updateDailySlots(updateSlot, user, date);
  }

  @ApiOperation({
    summary: 'startDate, endDate must be formatted by YYYY-MM-DD',
  })
  @HttpCode(HttpStatus.OK)
  @Post('report')
  async getReportByDate(
    @Body() reportDates: ReportDatesDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return await this.slotManagementService.getReportByDate(reportDates, user);
  }
}
