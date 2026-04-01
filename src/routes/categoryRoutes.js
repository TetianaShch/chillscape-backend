import { Router } from 'express';

import {
  getAllRegions,
  getAllLocationTypes,
} from '../controllers/categoryController.js';

const router = Router();

router.get('/', getAllRegions);
router.get('/location-types', getAllLocationTypes);

export default router;
