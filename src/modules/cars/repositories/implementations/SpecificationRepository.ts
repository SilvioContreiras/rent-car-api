import { Specification } from '../../entities/Specification';
import {
  ISpecificationRepository,
  ICreateSpecificationDTO
} from '../ISpecificationRepository';

import { getRepository, Repository } from 'typeorm';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = this.repository.create({ description, name });

    await this.repository.save(specification);
  }

  async findSpecificationByName(name: string): Promise<Specification | void>{
    const specification = await this.repository.findOne({ name })

    return specification;
  }
}

export { SpecificationRepository };
