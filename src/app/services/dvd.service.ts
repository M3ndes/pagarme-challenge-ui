import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IDvd } from '../models/dvd.model';

@Injectable()
export class DvdService{
    apiUrl = 'http://localhost:8080/dvd';
    constructor(private http: HttpClient){}

    async all(): Promise<IDvd> {
        const response: IDvd = await this.http.get<IDvd>(this.apiUrl).toPromise();
        return response;
      }
}
