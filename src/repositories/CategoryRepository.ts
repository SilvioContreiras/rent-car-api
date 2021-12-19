import { Category } from "../model/category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO) {
    const category = new Category();

    Object.assign(category, {
      name, 
      description,
      created_at: new Date(),
    })
  
    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findCategoryByName(name: string): Category | void {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

export { CategoryRepository }