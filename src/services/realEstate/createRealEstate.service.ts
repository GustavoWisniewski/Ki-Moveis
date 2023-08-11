import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../error";
import { IRealEstateCreate } from "../../interfaces/realEstate.interfaces";

export const createRealEstateService = async (
  realEstateData: IRealEstateCreate
): Promise<object> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryData = await categoryRepository.findOne({
    where: {
      id: realEstateData.categoryId!,
    },
  });
  if (realEstateData.address.number !== undefined) {
    const existingAddress = await addressRepository.findOne({
      where: {
        street: realEstateData.address.street,
        zipCode: realEstateData.address.zipCode,
        number: realEstateData.address.number,
      },
    });
    if (existingAddress) {
      throw new AppError("Address already exists", 409);
    }
  }

  const address = new Address();
  address.street = realEstateData.address.street;
  address.zipCode = realEstateData.address.zipCode;
  address.number = realEstateData.address.number;
  address.city = realEstateData.address.city;
  address.state = realEstateData.address.state;

  const savedAddress = await addressRepository.save(address);

  const realEstate = new RealEstate();
  realEstate.value = realEstateData.value;
  realEstate.size = realEstateData.size;
  realEstate.categoryId =
    realEstateData.categoryId !== undefined &&
    realEstateData.categoryId !== null
      ? realEstateData.categoryId
      : undefined;
  realEstate.address = savedAddress;

  const returningObject = {
    address: {
      city: realEstate.address.city,
      id: realEstate.address.id,
      number: realEstate.address.number,
      state: realEstate.address.state,
      street: realEstate.address.street,
      zipCode: realEstate.address.zipCode,
    },
    category: {
      id: realEstate.categoryId!,
      name: categoryData?.name!,
    },
    createdAt: realEstate.createdAt,
    id: realEstate.id,
    size: realEstate.size,
    sold: realEstate.sold,
    updatedAt: realEstate.updatedAt,
    value: realEstate.value,
  };

  await realEstateRepository.save(returningObject);

  return returningObject;
};
