import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { postCreateNewTicket, getTicketsTypes, getUserTickets } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .post('/', postCreateNewTicket)
  .get('/types', getTicketsTypes)
  .get('/', getUserTickets);

export { ticketsRouter };
