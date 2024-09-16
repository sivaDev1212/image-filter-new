import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const uploadImage = (req: Request, res: Response) => {
   try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        
        res.json({ filename: file.filename });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const processImage = async (req: Request, res: Response) => {
    const { format, brightness, contrast, saturation, rotation } = req.body;
    const filePath = path.join(__dirname, '../../uploads', req.body.filename);

    const outputFormat = format || 'jpeg';
    const outputFilename = `processedss-image.${outputFormat}`;
    const outputPath = path.join(__dirname, '../../uploads', outputFilename);

    const image = sharp(filePath);
    

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

     const processedImage = await image
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

        await sharp(processedImage).toFile(outputPath);

        const base64Image = processedImage.toString('base64');

    res.json({ image: base64Image, filename: outputFilename, format: outputFormat  });
};


export const previewImage = async (req: Request, res: Response) => {
    const { brightness, contrast, saturation, rotation } = req.body;
    const filePath = path.join(__dirname, '../../uploads', req.body.filename);

    const previewPath = req.body.filename;
    const image = sharp(filePath);

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

    await image
        .resize(300) 
        .rotate(rotationAngle || 0)
        .modulate({
            brightness: brightnessNumber || 1,
            saturation: saturationNumber || 1,
        })
        .linear(contrastNumber || 1) 
        .jpeg({ quality: 50 }) 
        .toFile(path.join(__dirname, '../../uploads', previewPath));

    res.json({ previewPath });
};

export const downloadImage = async(req: Request, res: Response) => {
    const { filename } = req.body;
    const downloadPath = path.join(__dirname, '../../uploads', filename); // Use the saved filename

    try {
        res.download(downloadPath, filename, (err) => {
            if (err) {
                console.error('Error downloading image:', err);
                res.status(500).json({ message: 'Error downloading image' });
            }
        });
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ message: 'Error downloading image' });
    }
};
