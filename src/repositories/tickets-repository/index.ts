import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function createNewTicket(ticket: CreateTicket) {
  const resolve = prisma.ticket.upsert({
    where: { id: ticket.id || 0 },
    create: ticket as CreateNewTicketParams,
    update: ticket,
  });

  return resolve;
}

async function getTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
  });
}

async function getTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}

async function getAllTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getUserTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
  });
}

async function getTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
  });
}

export type CreateTicket = Partial<Ticket>;
export type CreateNewTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketsRepository = {
  createNewTicket,
  getTicketByEnrollmentId,
  getTicketTypeById,
  getUserTickets,
  getAllTicketTypes,
  getTicketById,
};

export default ticketsRepository;
