"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImage = exports.previewImage = exports.processImage = exports.uploadImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const uploadImage = (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({ filename: file.filename });
    }
    catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.uploadImage = uploadImage;
const processImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { format, brightness, contrast, saturation, rotation } = req.body;
    const filePath = path_1.default.join(__dirname, '../../uploads', req.body.filename);
    const outputFormat = format || 'jpeg';
    const outputFilename = `processedss-image.${outputFormat}`;
    const outputPath = path_1.default.join(__dirname, '../../uploads', outputFilename);
    const image = (0, sharp_1.default)(filePath);
    const rotationAngle = Number(rotation);
    if (isNaN(rotationAngle)) {
        return res.status(400).json({ error: 'Invalid rotation value' });
    }
    const brightnessNumber = Number(brightness);
    if (isNaN(brightnessNumber)) {
        return res.status(400).json({ error: 'Invalid britness value' });
    }
    const saturationNumber = Number(saturation);
    if (isNaN(saturationNumber)) {
        return res.status(400).json({ error: 'Invalid stauration value' });
    }
    const contrastNumber = Number(contrast);
    if (isNaN(contrastNumber)) {
        return res.status(400).json({ error: 'Invalid contrast value' });
    }
    const processedImage = yield image
        .resize(300)
        .rotate(rotationAngle || 0)
        .modulate({
        brightness: brightnessNumber || 1,
        saturation: saturationNumber || 1,
    })
        .linear(contrastNumber || 1)
        .jpeg({ quality: 50 })
        .toFormat(format)
        .toBuffer();
    yield (0, sharp_1.default)(processedImage).toFile(outputPath);
    const base64Image = processedImage.toString('base64');
    res.json({ image: base64Image, filename: outputFilename, format: outputFormat });
});
exports.processImage = processImage;
const previewImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brightness, contrast, saturation, rotation } = req.body;
    const filePath = path_1.default.join(__dirname, '../../uploads', req.body.filename);
    const previewPath = req.body.filename;
    const image = (0, sharp_1.default)(filePath);
    const rotationAngle = Number(rotation);
    if (isNaN(rotationAngle)) {
        return res.status(400).json({ error: 'Invalid rotation value' });
    }
    const brightnessNumber = Number(brightness);
    if (isNaN(brightnessNumber)) {
        return res.status(400).json({ error: 'Invalid britness value' });
    }
    const saturationNumber = Number(saturation);
    if (isNaN(saturationNumber)) {
        return res.status(400).json({ error: 'Invalid stauration value' });
    }
    const contrastNumber = Number(contrast);
    if (isNaN(contrastNumber)) {
        return res.status(400).json({ error: 'Invalid contrast value' });
    }
    yield image
        .resize(300)
        .rotate(rotationAngle || 0)
        .modulate({
        brightness: brightnessNumber || 1,
        saturation: saturationNumber || 1,
    })
        .linear(contrastNumber || 1)
        .jpeg({ quality: 50 })
        .toFile(path_1.default.join(__dirname, '../../uploads', previewPath));
    res.json({ previewPath });
});
exports.previewImage = previewImage;
const downloadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.body;
    const downloadPath = path_1.default.join(__dirname, '../../uploads', filename); // Use the saved filename
    try {
        res.download(downloadPath, filename, (err) => {
            if (err) {
                console.error('Error downloading image:', err);
                res.status(500).json({ message: 'Error downloading image' });
            }
        });
    }
    catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ message: 'Error downloading image' });
    }
});
exports.downloadImage = downloadImage;
