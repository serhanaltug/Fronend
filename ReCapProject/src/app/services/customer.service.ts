import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:5001/api/customers/getAll";
  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<customerResponseModel> {
    return this.httpClient.get<customerResponseModel>(this.apiUrl);
  } 
}
