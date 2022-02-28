import { Category } from '../../entities/category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '../ICategoriesRepository';

import { getRepository, Repository } from 'typeorm'

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  private static ISTANCE: CategoriesRepository;

  private constructor() {
    this.repository = getRepository(Category)
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.ISTANCE) {
      CategoriesRepository.ISTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.ISTANCE;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ description, name })

   await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category | void> {
    const category = await this.repository.findOne({ name });

    console.log(category);

    return category;
  }
}

export { CategoriesRepository };
