// All API calls to the backend for uploading, getting previews, and downloading
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
  });
  return await response.json(); // Return uploaded image metadata
};

export const getPreview = async (filename: string, brightness: number) => {
  const response = await fetch('/api/preview', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename, brightness }),
  });
  return await response.json(); // Return preview image path
};

export const downloadImage = async (filename: string) => {
  const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename }),
  });

  const blob = await response.blob();
  const downloadURL = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = downloadURL;
  a.download = filename; // Set download file name
  a.click();
};
