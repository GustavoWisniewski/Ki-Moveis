import { Repository } from "typeorm";
import { Schedule } from "../../entities/schedules_users_propertites.entity";
import { RealEstate } from "../../entities/real_estate.entity";
import { User } from "../../entities/users.entity";
import { ISchedulesCreate } from "../../interfaces/schedules.interfaces";
import { AppError } from "../../error";
import { AppDataSource } from "../../data-source";

export const createSchedulesService = async (
  schedulesData: ISchedulesCreate,
  userId: number
): Promise<object> => {
  const schedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const realEstate = await realEstateRepository.findOne({
    where: { id: schedulesData.realEstateId },
  });
  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const scheduleTime = Number(schedulesData.hour.split(":")[0]);

  if (scheduleTime < 8 || scheduleTime >= 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const scheduleWeek = new Date(schedulesData.date);

  const scheduledDay = scheduleWeek.getDay();
  if (scheduledDay === 0 || scheduledDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const existingSchedule = await schedulesRepository
    .createQueryBuilder("schedules")
    .leftJoinAndSelect("schedules.realEstate", "realEstate")
    .where("schedules.date = :date", { date: schedulesData.date })
    .andWhere("schedules.hour = :hour", { hour: schedulesData.hour })
    .andWhere("realEstate.id = :realEstateId", {
      realEstateId: schedulesData.realEstateId,
    })
    .getOne();

  if (existingSchedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const existingScheduleUser = await schedulesRepository
    .createQueryBuilder("schedules")
    .leftJoinAndSelect("schedules.user", "user")
    .where("schedules.date = :date", { date: schedulesData.date })
    .andWhere("schedules.hour = :hour", { hour: schedulesData.hour })
    .andWhere("user.id = :user", {
      user: userId,
    })
    .getOne();

  if (existingScheduleUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedule = new Schedule();
  schedule.date = schedulesData.date;
  schedule.hour = schedulesData.hour;
  schedule.realEstate = realEstate;
  schedule.user = user!;

  await schedulesRepository.save(schedule);
  const returning = { message: "Schedule created" };
  return returning;
};
