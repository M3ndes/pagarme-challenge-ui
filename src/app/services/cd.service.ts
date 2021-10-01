import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ICd } from '../models/cd.model';
import { environment } from 'src/environments/environment';

const PATH = 'cd';

@Injectable()
export class CdService{

    constructor(private http: HttpClient){}

    async all(): Promise<ICd> {
        const response: ICd = await this.http.get<ICd>(`${environment.API_URL}/${PATH}`).toPromise();
        return response;
      }

      async create(payload: any): Promise<ICd> {
        const response: ICd = await this.http.post<ICd>(`${environment.API_URL}/${PATH}`, payload).toPromise();
        return response;
      }

      async update(body: any, id: number): Promise<ICd> {
        const response: ICd = await this.http.put<ICd>(`${environment.API_URL}/${PATH}/${id}`, body).toPromise();
        return response;
      }

      async delete(id: any): Promise<ICd> {
        const response: ICd = await this.http.delete<ICd>(`${environment.API_URL}/${PATH}/${id}`).toPromise();
        return response;
      }
}
