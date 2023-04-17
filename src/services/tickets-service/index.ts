import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';

async function createNewTicket(ticketTypeId: any) {
  if (!ticketTypeId) throw notFoundError();

  const newTicket = await ticketsRepository.createNewTicket({ ticketTypeId });

  return newTicket;
}

async function getAllTicketsTypes() {
  const tickets = await ticketsRepository.getAllTicketsTypes();

  if (!tickets) throw notFoundError();

  return tickets;
}

const ticketsService = {
  createNewTicket,
  getAllTicketsTypes,
};

export default ticketsService;
