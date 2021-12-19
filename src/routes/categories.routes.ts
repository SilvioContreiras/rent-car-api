import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();

const categoryRepository = new CategoryRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

 const createCategoryService = new CreateCategoryService(categoryRepository);

 createCategoryService.execute({ name, description });

  return response.status(201).send()
});

categoriesRoutes.get('/', (request, response) => {
  const showAll = categoryRepository.list();

  return response.status(200).json(showAll)
})

export { categoriesRoutes };
