import { requestError, notFoundError } from '@/errors';
import { CardDataInput } from '@/protocols';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/tickets-repository';

async function createPayment(userId: number, ticketId: number, cardData: CardDataInput) {
  if (!ticketId || !cardData) {
    throw requestError(400, 'BadRequest');
  }

  const tickeById = await ticketRepository.getTicketById(ticketId);
  const newPayment = await paymentRepository.createPayment(ticketId, cardData);

  return '';
}

async function getUserPayments(userId: number, ticketId: string) {
  const ticketIdToNumber = Number(ticketId);
  const paymentByTicketId = await paymentRepository.getUserPaymentByTicketId(ticketIdToNumber);

  if (!paymentByTicketId) {
    throw notFoundError();
  }

  return paymentByTicketId;
}

const paymentsService = {
  createPayment,
  getUserPayments,
};

export default paymentsService;
