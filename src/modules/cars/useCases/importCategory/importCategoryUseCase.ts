import { parse } from 'csv-parse';
import fs from 'fs';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportRepository {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  loadCategory(file: Express.Multer.File): Promise<IImportRepository[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportRepository[] = [];
    
      const parseFile = parse();
      
      stream.pipe(parseFile);
    
      parseFile.on('data', async (line) => {
        const [name, description] = line;

        categories.push({ name, description });
      })
      .on('end', () => resolve(categories))
      .on('error', (error) => reject(error));
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file);

    categories.map(async (category) => {
      const {name, description} = category;

      const isCategory = this.categoryRepository.findByName(name);

      if(!isCategory) {
        this.categoryRepository.create({ name, description})
      }
    })
  }
}

export { ImportCategoryUseCase }