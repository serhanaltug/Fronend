import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { listResponseModel } from '../models/listResponseModel';
import { responseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:5001/api/";
  constructor(private httpClient: HttpClient) { }

  getCarsFiltered(brandId:number, colorId:number): Observable<listResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getallwithdetails?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }
    getCars(): Observable<listResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getallwithdetails";
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }
  
  getCar(carId:number): Observable<listResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarwithdetails?id=" + carId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbycolor?colorId=" + colorId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrand?brandId=" + brandId;
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

}
