import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../error";

export const listSchedulesService = async (
  realEstateId: number
): Promise<object> => {
  const schedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateData = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: { address: true, category: true },
  });

  if (!realEstateData) {
    throw new AppError("RealEstate not found", 404);
  }

  const schedulesData = await schedulesRepository.find({
    where: { realEstate: { id: realEstateId } },
    relations: { user: true },
  });

  const returningObject = {
    ...realEstateData,
    schedules: schedulesData,
  };

  return returningObject;
};
