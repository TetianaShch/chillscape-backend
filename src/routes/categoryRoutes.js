//export { };


import { Router } from 'express';

import {
  getCategoriesWithRegions,
  getCategoriesWithLocationTypes,
} from '../controllers/categoryController.js';

const router = Router();

router.get('/categories', getCategoriesWithRegions);
router.get('/categories/location-types', getCategoriesWithLocationTypes);

export default router;