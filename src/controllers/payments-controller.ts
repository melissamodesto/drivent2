import { AuthenticatedRequest } from '@/middlewares';
import { CardDataInput } from '@/protocols';
import paymentService from '@/services/payments-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId: number = req.body.ticketId;
  const cardData: CardDataInput = req.body.cardData;

  try {
    const payment = await paymentService.createPayment(userId, ticketId, cardData);

    return res.status(httpStatus.CREATED).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId: string = req.query.ticketId as string;

  try {
    const payment = await paymentService.getUserPayments(userId, ticketId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
