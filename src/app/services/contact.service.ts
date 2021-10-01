import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IContact } from '../models/contact.model';

@Injectable()
export class ContactService {
  apiUrl = 'http://localhost:8080/contact';
  constructor(private http: HttpClient) { }

  async all(): Promise<IContact> {
    const response: IContact = await this.http.get<IContact>(this.apiUrl).toPromise();
    return response;
  }

  async find(id: any): Promise<IContact> {
    const response: IContact = await this.http.get<IContact>(`${this.apiUrl}/${id}`).toPromise();
    return response;
  }

  async create(payload: any): Promise<IContact> {
    const response: IContact = await this.http.post<IContact>(this.apiUrl, payload).toPromise();
    return response;
  }

  async update(body: any, id: number): Promise<IContact> {
    const response: IContact = await this.http.put<IContact>(`${this.apiUrl}/${id}`, body).toPromise();
    return response;
  }

  async delete(id: any): Promise<IContact> {
    const response: IContact = await this.http.delete<IContact>(`${this.apiUrl}/${id}`).toPromise();
    return response;
  }
}
