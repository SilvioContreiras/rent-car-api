import { inject, injectable } from "tsyringe";
import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: SpecificationRepository
    ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findSpecificationByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    await this.specificationRepository.create({
      description,
      name
    });
  }
}

export { CreateSpecificationUseCase };
