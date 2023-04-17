import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function createNewTicket(ticket: CreateTicket) {
  return prisma.ticket.upsert({
    where: { id: ticket.id || 0 },
    create: ticket as CreateNewTicketParams,
    update: ticket,
  });
}

async function getAllTicketsTypes() {
  return prisma.ticket.findMany();
}

export type CreateTicket = Partial<Ticket>;
export type CreateNewTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

const ticketsRepository = {
  createNewTicket,
  getAllTicketsTypes,
};

export default ticketsRepository;
