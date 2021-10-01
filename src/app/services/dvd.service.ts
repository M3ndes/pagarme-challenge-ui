import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IDvd } from '../models/dvd.model';
import { environment } from 'src/environments/environment';

const PATH = 'dvd';

@Injectable()
export class DvdService {
  constructor(private http: HttpClient) { }

  async all(): Promise<IDvd> {
    const response: IDvd = await this.http.get<IDvd>(`${environment.API_URL}/${PATH}`).toPromise();
    return response;
  }

  async create(payload: any): Promise<IDvd> {
    const response: IDvd = await this.http.post<IDvd>(`${environment.API_URL}/${PATH}`, payload).toPromise();
    return response;
  }

  async update(body: any, id: number): Promise<IDvd> {
    const response: IDvd = await this.http.put<IDvd>(`${environment.API_URL}/${PATH}/${id}`, body).toPromise();
    return response;
  }

  async delete(id: any): Promise<IDvd> {
    const response: IDvd = await this.http.delete<IDvd>(`${environment.API_URL}/${PATH}/${id}`).toPromise();
    return response;
  }
}
