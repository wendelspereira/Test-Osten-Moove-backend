import { Business } from "../../infra/mysql/entity/Business";
import { BusinessRepository } from "../../infra/mysql/repository/BusinessRepository";

export class ListBusinessUseCase {
  async execute(): Promise<Business[] | []> {
    const businessRepository = new BusinessRepository();
    const result = await businessRepository.list();
    return result;
  }
}

