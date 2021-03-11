import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { colorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:5001/api/colors/getAll";
  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<colorResponseModel> {
    return this.httpClient.get<colorResponseModel>(this.apiUrl);
  } 
}
