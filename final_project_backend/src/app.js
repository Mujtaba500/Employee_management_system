import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import allRoutes from './routes/routes.js';
import connectDB from './db/config.js';
// import syncDb from './db/sync.js';
import morgan from 'morgan';
import './models/index.js'; // write all your association and import models  in this file
// import './seeders/index.js'; // seeders file

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
    // credentials: true,
  })
);
app.use(morgan('dev')); // request logging
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

await connectDB();

app.use('/api', express.static('src/uploads'));

app.use('/api', allRoutes);

app.get('/', (req, res) => {
  console.log('API hit');
  res.send('API live');
});

app.listen(port, () => {
  const address = `http://localhost:${port}`;
  console.log(`Server running on ${address}`);
});
