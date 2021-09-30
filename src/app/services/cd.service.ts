import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ICd } from '../models/cd.model';

@Injectable()
export class CdService{
    apiUrl = 'http://localhost:8080/cd';
    constructor(private http: HttpClient){}

    async all(): Promise<ICd> {
        const response: ICd = await this.http.get<ICd>(this.apiUrl).toPromise();
        return response;
      }
}
