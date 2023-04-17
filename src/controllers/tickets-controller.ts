import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function postCreateNewTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = req.body.ticketTypeId as number;
  const { userId } = req;

  try {
    const newTicket = await ticketsService.createNewTicket(ticketTypeId, userId);

    return res.status(httpStatus.CREATED).send({ newTicket });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.BAD_REQUEST);
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketsService.getAllTicketsTypes();

    return res.status(httpStatus.OK).json(tickets);
  } catch (error) {
    return res.status(httpStatus.NO_CONTENT);
  }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const userTickets = await ticketsService.getUserTickets(userId);

    return res.status(httpStatus.OK).json(userTickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND);
  }
}
