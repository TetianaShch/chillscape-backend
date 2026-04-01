import Region from '../models/region.js';
import LocationType from '../models/locationType.js';

export const getAllRegions = async (req, res, next) => {
  try {
    const regions = await Region.find(); // просто беремо всі регіони

    res.status(200).json({
      status: 200,
      message: 'Successfully found regions!',
      data: regions, // віддаємо як є
    });
  } catch (error) {
    next(error); // тут потрібен next → ти його не передала в параметри
  }
};

export const getAllLocationTypes = async (req, res, next) => {
  try {
    const locationTypes = await LocationType.find();
    // беремо всі типи, без циклів і category

    res.status(200).json({
      status: 200,
      message: 'Successfully found location types!',
      data: locationTypes, // просто віддаємо масив
    });

  } catch (error) {
    next(error); // замість console.error
  }
};
