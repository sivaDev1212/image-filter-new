import { Router } from 'express';
import { uploadImage, processImage, downloadImage, previewImage } from '../controllers/imageController';
import multer from 'multer';

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

const router: Router = Router();

router.post('/upload', upload.single('image'), uploadImage); // Handle image upload
router.post('/process', processImage); // Handle image processing
router.post('/preview', previewImage); // Handle image preview generation
router.post('/download', downloadImage); // Handle image download

export default router;
