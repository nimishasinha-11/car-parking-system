import express from 'express';
import parkingRoutes from './routes/parkingRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', parkingRoutes);



app.listen(PORT, () => {
    console.log(`🚗 Parking lot server running on http://localhost:${PORT}`);
});
