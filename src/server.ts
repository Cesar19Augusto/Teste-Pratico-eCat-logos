import express from 'express';
import productRoutes from './routes/product.routes';

const app = express();
app.use(express.json());

app.use('/api', productRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});