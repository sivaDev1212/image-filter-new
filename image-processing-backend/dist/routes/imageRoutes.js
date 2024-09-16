"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const multer_1 = __importDefault(require("multer"));
// Setup multer for file uploads
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = (0, express_1.Router)();
router.post('/upload', upload.single('image'), imageController_1.uploadImage); // Handle image upload
router.post('/process', imageController_1.processImage); // Handle image processing
router.post('/preview', imageController_1.previewImage); // Handle image preview generation
router.post('/download', imageController_1.downloadImage); // Handle image download
exports.default = router;
