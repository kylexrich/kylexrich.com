import multer from "multer";

export const ENV = process.env.NODE_ENV ?? 'development';
export const PORT = process.env.PORT ?? 3001;
export let HOST_URL: string;
switch (ENV) {
    case 'development':
        HOST_URL = `http://localhost:${PORT}`;
        break;
    case 'staging':
        HOST_URL = 'https://kylexrich-staging-d5a9dbd6a715.herokuapp.com';
        break;
    case 'production':
        HOST_URL = 'https://kylerich.com';
        break;
    default:
        HOST_URL = `http://localhost:${PORT}`;
}

// Set up the multer middleware to handle file uploads
export const upload: multer.Multer = multer({storage: multer.memoryStorage()});