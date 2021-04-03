import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CarDetail } from '../models/car';
import { listResponseModel } from '../models/listResponseModel';
import { responseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:5001/api/";
  constructor(private httpClient: HttpClient) { }

  getCarsFiltered(brandId:number, colorId:number): Observable<listResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getallwithdetails?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<listResponseModel<CarDetail>>(newPath);
  }

  getCarsWithDetail(): Observable<listResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getallwithdetails";
    return this.httpClient.get<listResponseModel<CarDetail>>(newPath);
  }
  
  getCarDetail(carId:number): Observable<SingleResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarwithdetails?id=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCars(carId:number): Observable<listResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcars";
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }

  getCar(carId:number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getById?id=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
 
  add(car:Car):Observable<responseModel>{
    return this.httpClient.post<responseModel>(this.apiUrl + "cars/add", car);
  }

  update(car:Car):Observable<responseModel>{
    return this.httpClient.post<responseModel>(this.apiUrl + "cars/update", car);
  }

}
