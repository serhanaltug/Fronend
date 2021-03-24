import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { responseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  rentalForCheckOut:Rental;
  apiUrl = "https://localhost:5001/api/";
  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<listResponseModel<Rental>> {
    let newPath = this.apiUrl + "rentals/getAllWithDetails";
    return this.httpClient.get<listResponseModel<Rental>>(newPath);
  }

  setCheckOut(rental:Rental){
    this.rentalForCheckOut = rental;
  }

  getCheckOut(){
    return this.rentalForCheckOut;
  }
  
  checkRental(rental:Rental): Observable<responseModel> {
    let newPath = this.apiUrl + "rentals/check";
    return this.httpClient.post<responseModel>(newPath, rental);
  }  

  addRental(rental:Rental): Observable<responseModel> {
    let newPath = this.apiUrl + "rentals/add";
    return this.httpClient.post<responseModel>(newPath, rental);
  }  
}
