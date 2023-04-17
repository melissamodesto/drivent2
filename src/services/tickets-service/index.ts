import { notFoundError, requestError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository, { CreateTicket } from '@/repositories/tickets-repository';
import { TicketStatus } from '@prisma/client';

async function createNewTicket(ticketTypeId: number, userId: number) {
  if (!ticketTypeId) {
    throw requestError(400, 'Bad Request');
  }

  const idEnrollmentByUserId = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!idEnrollmentByUserId) {
    throw notFoundError();
  }

  const ticketType = await ticketsRepository.getTicketTypeById(ticketTypeId);

  const ticket = {
    status: TicketStatus.RESERVED,
    ticketTypeId: ticketType.id,
    enrollmentId: idEnrollmentByUserId.id,
  } as CreateTicket;

  const newTicket = await ticketsRepository.createNewTicket(ticket);

  return { ...newTicket, TicketType: ticketType };
}

async function getAllTicketsTypes() {}

async function getUserTickets(userId: number) {
  const { id: enrollmentId } = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentId) {
    throw notFoundError();
  }

  const ticketByEnrollment = await ticketsRepository.getTicketByEnrollmentId(enrollmentId);

  if (!ticketByEnrollment) {
    throw notFoundError();
  }

  const typeTicket = await ticketsRepository.getTicketTypeById(ticketByEnrollment.ticketTypeId);

  if (!typeTicket) {
    throw notFoundError();
  }

  return { ...ticketByEnrollment, TicketType: typeTicket };
}

const ticketsService = {
  createNewTicket,
  getAllTicketsTypes,
  getUserTickets,
};

export default ticketsService;
