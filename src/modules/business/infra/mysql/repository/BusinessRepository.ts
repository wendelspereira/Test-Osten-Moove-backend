import { ArrayContains, Like, Raw } from "typeorm";
import { AppDataSource } from "../../../../../../data-source";
import { AppError } from "../../../../../shared/error/AppError";
import { ICreateBusinessDTO } from "../../../dtos/IBusinessDTOs";
import { IBusinessRepository } from "../../../repository/IBusinessRepository";
import { Business } from "../entity/Business";

export class BusinessRepository implements IBusinessRepository {
  private repository;
  constructor() {
    this.repository = AppDataSource.manager;
  }

  async create(data: ICreateBusinessDTO): Promise<void> {
    try {
      console.log( data)

      const business = this.repository.create(Business, data);
      await this.repository.save(business);
    } catch (err) {
      throw new AppError(`Error while saving data: ${err}`, 500);
    }
  }

  async list(): Promise<Business[] | []> {
    try {
      const allBusiness = await this.repository.find(Business);
      return allBusiness;
    } catch (err) {
      throw new AppError(`Error while getting data: ${err}`, 500);
    }
  }

  async findById(id: number): Promise<Business | null> {
    if (!id) {
      throw new AppError(`Unable to delete data. Non-existent or invalid id.`);
    }
    try {
      const business = await this.repository.findOneBy(Business, {
        id: id,
      });
      return business;
    } catch (err) {
      throw new AppError(`Error while find data: ${err}`, 500);
    }
  }

  async findByTradeName(tradeName: string): Promise<Business[] | []> {
    if (!tradeName) return [];
    try {
      const business = await this.repository.find(Business, {
        where: {
          tradeName: Like(`%${tradeName}%`),
        },
      });

      return business;
    } catch (err) {
      throw new AppError(`Error while find data: ${err}`, 500);
    }
  }

  async cnpjAlreadyRegistered(cnpj: string): Promise<boolean> {
    if (!cnpj) {
      throw new AppError(`Unable to find data for given CNPJ: ${cnpj}`);
    }
    try {
      const business = await this.repository.findOne(Business, {
        where: { cnpj: cnpj },
        select: ["id"],
      });
      return Boolean(business);
    } catch (err) {
      throw new AppError(`Error while find data: ${err}`, 500);
    }
  }

  async update(id: number, data: Business): Promise<void> {
    

    if (!id) {
      throw new AppError(`Unable to delete data. Non-existent or invalid id.`);
    }

    if (!(data instanceof Business)) {
      throw new AppError("Badly formatted or missing data!", 500);
    }
    const business = await this.findById(id);
    if (!business) {
      throw new AppError(`Data not found for given id: ${id}`);
    }

    try {
      await this.repository.update(Business, id, data);
    } catch (err) {
      throw new AppError(`Error while updating: ${err}`, 500);
    }
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new AppError(`Unable to delete data. Non-existent or invalid id.`);
    }
    const business = await this.findById(id);
    if (!business) {
      throw new AppError("Data not found!");
    }
    try {
      await this.repository.delete(Business, id);
    } catch (err) {
      throw new AppError(`error while deleting: ${err}`, 500);
    }
  }
}
