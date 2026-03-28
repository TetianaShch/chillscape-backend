import { Router } from 'express';

import {
  getCategoriesWithRegions,
  getCategoriesWithLocationTypes,
} from '../controllers/categoryController.js';

const router = Router();

router.get('/', getCategoriesWithRegions);
router.get('/location-types', getCategoriesWithLocationTypes);

export default router;
