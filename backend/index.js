import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api', (request, response) => {
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  // Skip API routes
  if (req.url.startsWith('/books/') || req.url === '/books') {
    return;
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5555;

console.log("MongoDB URL:", process.env.MONGODB_URL || process.env.MONGO_URI);

// Try both environment variable names
const mongoUri = process.env.MONGODB_URL || process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MongoDB URL is not defined in environment variables!");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`App is listening on all interfaces at port: ${PORT}`);
      console.log(`Frontend should be accessible at http://SERVER_IP:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// import express from 'express';
// import mongoose from 'mongoose';
// import booksRoute from './routes/booksRoute.js';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();

// // Middleware for parsing request body
// app.use(express.json());

// // Middleware for handling CORS POLICY
// // Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// // Option 2: Allow Custom Origins
// // app.use(
// //   cors({
// //     origin: 'http://localhost:3000',
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     allowedHeaders: ['Content-Type'],
// //   })
// // );

// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome To MERN Stack Tutorial');
// });

// app.use('/books', booksRoute);

// const PORT = 5555;

// console.log("MongoDB URL:", process.env.MONGODB_URL);
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
