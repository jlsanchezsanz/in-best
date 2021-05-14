import express from 'express';

import { connectDB } from './config/db';
import { companiesRouter } from './routes/api/companies';

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/companies', companiesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
