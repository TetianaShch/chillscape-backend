import crypto from 'node:crypto';
import createHttpError from 'http-errors';

const CLOUDINARY_API_BASE = 'https://api.cloudinary.com/v1_1';

const getCloudinaryConfig = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_FOLDER || 'chillscape/locations';

  if (!cloudName || !apiKey || !apiSecret) {
    throw createHttpError(
      500,
      'Cloudinary configuration is missing on the server',
    );
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    folder,
  };
};

const buildSignature = (params, apiSecret) => {
  const paramsToSign = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto
    .createHash('sha1')
    .update(`${paramsToSign}${apiSecret}`)
    .digest('hex');
};

export const uploadImageToCloudinary = async (file) => {
  if (!file) {
    return null;
  }

  const { cloudName, apiKey, apiSecret, folder } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);

  const publicIdBase = file.originalname
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  const uploadParams = {
    folder,
    timestamp,
    public_id: `${Date.now()}-${publicIdBase || 'location-image'}`,
  };

  const signature = buildSignature(uploadParams, apiSecret);
  const formData = new FormData();

  formData.append(
    'file',
    new Blob([file.buffer], { type: file.mimetype }),
    file.originalname,
  );
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('folder', folder);
  formData.append('public_id', uploadParams.public_id);
  formData.append('signature', signature);

  const response = await fetch(
    `${CLOUDINARY_API_BASE}/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const payload = await response.json();

  if (!response.ok || !payload.secure_url) {
    throw createHttpError(
      502,
      payload.error?.message || 'Failed to upload image to Cloudinary',
    );
  }

  return payload.secure_url;
};
