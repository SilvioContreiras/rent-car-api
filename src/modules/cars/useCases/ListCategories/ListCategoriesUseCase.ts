import { Category } from "../../model/category";
import { CategoryRepository } from "../../repositories/CategoryRepository";


class ListCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  
  execute(): Category[] {
    const categories = this.categoryRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase }