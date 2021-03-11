import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { brandResponseModel } from '../models/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:5001/api/brands/getAll";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<brandResponseModel> {
    return this.httpClient.get<brandResponseModel>(this.apiUrl);
  } 
}
