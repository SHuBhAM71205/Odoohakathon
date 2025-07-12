import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import swapRoutes from './routes/swap.route.js';
import feedbackRoutes from './routes/feedback.route.js';
import utilsRoutes from './routes/utils.route.js';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json()); 
app.use(cors()); 

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/users', userRoutes); 
app.use('/v1/api/admin', adminRoutes); 
app.use('/v1/api/swaps', swapRoutes);
app.use('/v1/api/feedback', feedbackRoutes);
app.use('/v1/api/utils', utilsRoutes);

export default app;
