import { Specification } from '../model/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}
interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findSpecificationByName(name: string): Specification | undefined;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
