import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IContact } from '../models/contact.model';
import { environment } from 'src/environments/environment';

const PATH = 'contact';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  async all(): Promise<IContact> {
    const response: IContact = await this.http.get<IContact>(`${environment.API_URL}/${PATH}`).toPromise();
    return response;
  }

  async find(id: any): Promise<IContact> {
    const response: IContact = await this.http.get<IContact>(`${environment.API_URL}/${PATH}/${id}`).toPromise();
    return response;
  }

  async create(payload: any): Promise<IContact> {
    const response: IContact = await this.http.post<IContact>(`${environment.API_URL}/${PATH}`, payload).toPromise();
    return response;
  }

  async update(body: any, id: number): Promise<IContact> {
    const response: IContact = await this.http.put<IContact>(`${environment.API_URL}/${PATH}/${id}`, body).toPromise();
    return response;
  }

  async delete(id: any): Promise<IContact> {
    const response: IContact = await this.http.delete<IContact>(`${environment.API_URL}/${PATH}/${id}`).toPromise();
    return response;
  }
}
