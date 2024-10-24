import express from 'express';
import dotenv from 'dotenv';
import sequelize from './utils/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });



