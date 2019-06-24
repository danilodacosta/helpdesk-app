import { Injectable } from '@angular/core';
import { HELP_DESK_API } from './helpdesk.api';
import { User } from './../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private httpCliente: HttpClient) {}

  login(user: User) {
    return this.httpCliente.post(`${HELP_DESK_API}/api/auth`, user);
  }

  createOrUpdate(user: User) {
    if (user.id !== null && user.id !== '') {
      return this.httpCliente.put(`${HELP_DESK_API}/api/user`, user);
    } else {
      user.id = null;
      return this.httpCliente.post(`${HELP_DESK_API}/api/user`, user);
    }
  }

  findAll(page: number , count: number) {
    return this.httpCliente.get(`${HELP_DESK_API}/api/user/${page}/${count}`);
  }

  findById(id: string) {
    return this.httpCliente.get(`${HELP_DESK_API}/api/user/${id}`);
  }

  delete(id: string) {
    return this.httpCliente.delete(`${HELP_DESK_API}/api/user/${id}`);
  }

}
