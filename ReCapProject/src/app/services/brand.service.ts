import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { listResponseModel } from '../models/listResponseModel';
import { responseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:5001/api/";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<listResponseModel<Brand>> {
    return this.httpClient.get<listResponseModel<Brand>>(this.apiUrl + "brands/getAll");
  }

  getBrand(brandId:number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + "brands/getById?id=" + brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<responseModel>{
    return this.httpClient.post<responseModel>(this.apiUrl + "brands/add", brand);
  } 

  update(brand:Brand):Observable<responseModel>{
    return this.httpClient.post<responseModel>(this.apiUrl + "brands/update", brand);
  }   
}
