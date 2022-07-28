import { ICreateBusinessDTO } from "../../dtos/IBusinessDTOs";
import { AppError } from "../../../../shared/error/AppError";
import { validateCNPJ } from "../../../../utils/cnpjValidate.js";
import { Business } from "../../infra/mysql/entity/Business";
import { BusinessRepository } from "../../infra/mysql/repository/BusinessRepository";

export class CreateBusinessUseCase {
  async execute(data: ICreateBusinessDTO) {
    const business = new Business();
    const businessRepository = new BusinessRepository();
    Object.assign(business, data);
    const businessAlreadyExists =
      await businessRepository.cnpjAlreadyRegistered(business.cnpj);
    if (businessAlreadyExists) {
      throw new AppError(
        "There is already a registration for the informed CNPJ!",
        400
      );
    }
    const isValidCnpj = validateCNPJ(business.cnpj);

    if (!isValidCnpj) {
      throw new AppError("Invalid CNPJ!", 450);
    }
    await businessRepository.create(business);
  }
}
