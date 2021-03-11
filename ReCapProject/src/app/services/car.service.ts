import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carResponseModel } from '../models/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:5001/api/cars/getAll";
  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<carResponseModel> {
    return this.httpClient.get<carResponseModel>(this.apiUrl);
  } 
}
