import React from 'react';

type Adjustments = {
    brightness: number;
    contrast: number;
    saturation: number;
    rotation: number;
};

type ImagePreviewProps = {
    adjustments: Adjustments;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ adjustments }) => {
    
    const { brightness, contrast, saturation, rotation } = adjustments;

    return (
        <div className='edited-values'>
            
            <p>Brightness: {brightness}</p>
            <p>Contrast: {contrast}</p>
            <p>Saturation: {saturation}</p>
            <p>Rotation: {rotation} degrees</p>
        </div>
    );
};

export default ImagePreview;
