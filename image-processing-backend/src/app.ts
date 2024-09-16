import express from 'express';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes';  // Your routes
// app.ts
const app = express();
export { app }; // Named export


// Enable CORS for all routes and origins
app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend origin
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // If you're using cookies
}));

app.use(express.json());
app.use('/api', imageRoutes); // Mount your routes


