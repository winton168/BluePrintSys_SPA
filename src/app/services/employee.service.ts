import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { employeeDTO } from '../Models/employeeDTO';
import { employeeInsertDTO } from '../Models/employeeInsertDTO';
import { employeeUpdateDTO } from '../Models/employeeUpdateDTO';
import { responseDTO } from '../Models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }
  

  InsertEmployee(employeeInsertDTO: employeeInsertDTO){
    return this.httpClient.post<responseDTO>(`${environment.apiRootUrl}/Employees/InsertEmployee`, employeeInsertDTO);
  }


  GetAll(){
    return this.httpClient.get<responseDTO>(`${environment.apiRootUrl}/Employees/GetAll`);
  }


 DeleteEmployee(employDTO: employeeDTO){
    return this.httpClient.post<responseDTO>(`${environment.apiRootUrl}/Employees/DeleteEmployee`, employDTO);
  }

  UpdateEmployee(employUpdateDTO: employeeUpdateDTO){
    return this.httpClient.post<responseDTO>(`${environment.apiRootUrl}/Employees/UpdateEmployee`, employUpdateDTO);
  }


}
