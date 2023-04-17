import { prisma } from '@/config';
import { CardDataInput } from '@/protocols';

async function createPayment(ticketId: number, cardData: CardDataInput) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...(cardData as any),
    },
  });
}

async function getPayment() {
  return;
}

async function getUserPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentRepository = {
  createPayment,
  getPayment,
  getUserPaymentByTicketId,
};

export default paymentRepository;
