import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IContact } from '../models/contact.model';

@Injectable()
export class ContactService {
    apiUrl = 'http://localhost:8080/contact';
    constructor(private http: HttpClient){}

    async all(): Promise<IContact> {
        const response: IContact = await this.http.get<IContact>(this.apiUrl).toPromise();
        return response;
      }
}