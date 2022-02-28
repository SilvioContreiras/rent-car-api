import { Category } from '../entities/category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category | void;
  create({ name, description }: ICreateCategoryDTO): void;
  list(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
