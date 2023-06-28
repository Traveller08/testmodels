import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';


const app = express();


// Enable CORS for all routes
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const __filename = fileURLToPath(import.meta.url);
// Get the current module's directory path
const __dirname = dirname(__filename);

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { originalname, path: tempFilePath } = req.file;
  const targetPath = join(__dirname, 'uploads', originalname);

  fs.rename(tempFilePath, targetPath, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error occurred while saving the file.');
    }
    return res.send('File uploaded and saved successfully.');
  });
  res.send('File uploaded successfully.');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
