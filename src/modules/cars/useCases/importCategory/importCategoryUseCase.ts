import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportRepository {
  name: string;
  description: string;
}
@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: CategoriesRepository
    ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportRepository[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportRepository[] = [];
      const parseFile = parse();

      stream.pipe(parseFile);
      
      parseFile
      .on('data', async (line) => {
          console.log(line)
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories)
        })
        .on('error', (error) => reject(error));
    });
  }

  async execute(file: Express.Multer.File | any): Promise<void>    {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const isCategory = await this.categoryRepository.findByName(name);

      if (!isCategory) {
        await this.categoryRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
