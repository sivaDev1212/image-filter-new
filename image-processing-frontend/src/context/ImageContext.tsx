import React, { createContext, useContext, useState, ReactNode } from 'react';

type ImageContextType = {
    imageFile: File | null;
    setImageFile: (file: File | null) => void;
    brightness: number;
    setBrightness: (value: number) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImageContext must be used within an ImageProvider");
    }
    return context;
};

type ImageProviderProps = {
    children: ReactNode;
};

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [brightness, setBrightness] = useState<number>(1);
    
    return (
        <ImageContext.Provider value={{ imageFile, setImageFile, brightness, setBrightness }}>
            {children}
        </ImageContext.Provider>
    );
};
