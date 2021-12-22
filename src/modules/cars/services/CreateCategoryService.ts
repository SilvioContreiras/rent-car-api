import { CategoryRepository } from '../repositories/CategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  execute({ name, description }: IRequest) {
    const categoryAlreadyExists =
      this.categoryRepository.findCategoryByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const category = this.categoryRepository.create({
      name,
      description
    });
  }
}

export { CreateCategoryService };
