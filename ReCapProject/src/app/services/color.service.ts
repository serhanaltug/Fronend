import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { listResponseModel } from '../models/listResponseModel';
import { responseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:5001/api/";
  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<listResponseModel<Color>> {
    return this.httpClient.get<listResponseModel<Color>>(this.apiUrl + "colors/getAll");
  } 

  getColor(colorId:number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + "colors/getById?id=" + colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }
  add(color:Color):Observable<responseModel>{
    return this.httpClient.post<responseModel>(this.apiUrl + "colors/add", color);
  }
  
  update(color:Color):Observable<responseModel>{
    return this.httpClient.post<responseModel>(this.apiUrl + "colors/update", color);
  } 
  
}
