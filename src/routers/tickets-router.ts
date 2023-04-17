import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { postCreateNewTicket, getTicketsTypes } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).post('/', postCreateNewTicket).get('/types', getTicketsTypes);

export default ticketsRouter;
