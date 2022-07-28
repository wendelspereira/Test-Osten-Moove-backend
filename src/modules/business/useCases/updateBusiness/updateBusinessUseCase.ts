import { AppError } from "../../../../shared/error/AppError.js";
import { validateCNPJ } from "../../../../utils/cnpjValidate.js";
import { Business } from "../../infra/mysql/entity/Business.js";
import { BusinessRepository } from "../../infra/mysql/repository/BusinessRepository.js";

export class UpdateBusinessUseCase {
  async execute(data: Business, id: string) {
    const numberId = parseInt(id)
    const businessRepository = new BusinessRepository();
    const business = new Business();
    Object.assign(business, data);

    const isValidCnpj = validateCNPJ(business.cnpj);
    if (!isValidCnpj) {
      throw new AppError("Invalid CNPJ!", 450);
    }

    await businessRepository.update(numberId, business);
  }
}
