import Category from '../models/category.js';
import Region from '../models/region.js';
import LocationType from '../models/locationType.js';

export const getCategoriesWithRegions = async (req, res) => {
  try {
    // 1. беремо всі категорії
    const categories = await Category.find();

    const result = [];

    // 2. для кожної категорії шукаємо регіони
    for (const cat of categories) {
      const regions = await Region.find({ category: cat._id });

      // 3. формуємо відповідь
      result.push({
        id: cat._id,
        name: cat.name,
        regions: regions.map(r => ({
          id: r._id,
          name: r.name,
        })),
      });
    }

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCategoriesWithLocationTypes = async (req, res) => {
  try {
    // 1. беремо всі категорії
    const categories = await Category.find();

    const result = [];

    // 2. для кожної категорії шукаємо типи
    for (const cat of categories) {
      const locationTypes = await LocationType.find({
        category: cat._id,
      });

      // 3. формуємо відповідь
      result.push({
        id: cat._id,
        name: cat.name,
        locationTypes: locationTypes.map(lt => ({
          id: lt._id,
          name: lt.name,
        })),
      });
    }

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
