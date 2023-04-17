import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { postPayment, getPayment } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).post('/process', postPayment).get('/', getPayment);

export { paymentsRouter };
