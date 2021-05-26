import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { positionDTO } from '../Models/positionDTO';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private httpClient: HttpClient) { }

  getAllPosition(){
    return this.httpClient.get<positionDTO []>(`${environment.apiRootUrl}/Positions/GetAll`)
  }


}
