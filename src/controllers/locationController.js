import Location from '../models/location.js';
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: "Локацiя не знайдена" });

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
    console.log(error);
  }
};

export const createLocation = async (req, res) => {
  try {
    // Данные из текстовых полей (проверенные Celebrate)
    const { name, type, region, description } = req.body;

    // Данные о файлах из Multer (массив путей к картинкам)
    const images = req.files.map(file => file.path);

    const newLocation = await Location.create({
      name,
      type,
      region,
      description,
      images,
      owner: req.user._id // Привязываем создателя из токена
    });

    res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка при створенні локації" });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ message: "Локація не знайдена" });
    }

    // Проверка: ты ли хозяин этой записи?
    if (location.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Ви не можете редагувати чужу локацію" });
    }

    // Собираем данные для обновления
    const updateData = { ...req.body };
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }

    const updated = await Location.findByIdAndUpdate(locationId, updateData, { new: true });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка при оновленні" });
  }
};
