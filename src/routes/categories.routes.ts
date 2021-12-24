import { Router } from 'express';
import { CategoryRepository } from '../modules/cars/repositories/CategoryRepository';
import { createCategoryController } from '../modules/cars/useCases/CreateCategory/';

const categoriesRoutes = Router();

const categoryRepository = new CategoryRepository();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  const showAll = categoryRepository.list();

  return response.status(200).json(showAll);
});

export { categoriesRoutes };
