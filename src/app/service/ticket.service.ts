import { Ticket } from './../model/ticket.model';
import { Injectable } from '@angular/core';
import { HELP_DESK_API } from './helpdesk.api';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TicketService {

  constructor(private httpCliente: HttpClient) {}

  createOrUpdate(ticket: Ticket) {
    if (ticket.id !== null && ticket.id !== '') {
      return this.httpCliente.put(`${HELP_DESK_API}/api/ticket`, ticket);
    } else {
      ticket.id = null;
      ticket.status = 'New';
      return this.httpCliente.post(`${HELP_DESK_API}/api/ticket`, ticket);
    }
  }

  findAll(page: number , count: number) {
    return this.httpCliente.get(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  findById(id: string) {
    return this.httpCliente.get(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  delete(id: string) {
    return this.httpCliente.delete(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  findByParams(page: number , count: number , assignedToMe: boolean , ticket: Ticket) {

    ticket.number = ticket.number === null ? 0 : ticket.number;
    ticket.title  = ticket.title === '' ? 'uninformed' : ticket.title;
    ticket.status = ticket.status === '' ? 'uninformed' : ticket.status;
    ticket.priority = ticket.priority === '' ? 'uninformed' : ticket.priority;

    return this.httpCliente.get(
      `${HELP_DESK_API}/api/ticket/
      ${page}/
      ${count}/
      ${ticket.number}/
      ${ticket.title}/
      ${ticket.status}/
      ${ticket.priority}/
      ${assignedToMe}`
    );
  }

  changeStatus(status: string, ticket: Ticket) {
    return this.httpCliente.put(`${HELP_DESK_API}/api/ticket/${ticket.id}/${status}`, ticket);
  }

  summary() {
    return this.httpCliente.get(`${HELP_DESK_API}/api/ticket/summary`);
  }

}
