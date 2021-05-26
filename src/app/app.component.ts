import { Component, OnInit } from '@angular/core';
import { employeeDTO } from './Models/employeeDTO';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BluePrint';

  employeeUpdatetDTOList: employeeDTO[] = [];

  employeeDTOItem : employeeDTO = { 
    employeeId : 0, 
    employeeGruid: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    positionId: 0,
    positionName: "",
    comment: ""
  };


  constructor(private employeeService: EmployeeService) { }


  ngOnInit(): void {

    this.RefreshEmployeeList();
  }


  RefreshEmployeeList()
  {
    console.log("refresh employee list ");
    this.employeeService.GetAll().subscribe( response => {
      this.employeeUpdatetDTOList = response.dataList;
      console.log(response.dataList)
    }, error => {
      console.log( error);
    })
  }


  ParentRefreshEmployeeList(){
    console.log("ParentRefreshEmployeeList() was called." );
    this.RefreshEmployeeList();
  }


  ParentCatchEditItemEvent(employDTO: employeeDTO)
  {
    // alert('parent catch employee id:' + employDTO.employeeId);
    console.log('parent catch employee id:' + employDTO.employeeId);

    this.employeeDTOItem  = { 
      employeeId : employDTO.employeeId,
      employeeGruid: employDTO.employeeGruid,
      fullName: employDTO.fullName,
      address: employDTO.address,
      phoneNumber: employDTO.phoneNumber,
      positionId: employDTO.positionId,
      positionName: employDTO.positionName,
      comment: employDTO.comment
    };

  }

  ParentCatchDeleteItemEvent()
  {
    console.log("ParentCatchDeleteItemEvent() was called." );
    this.RefreshEmployeeList();
    
    // here also clean up edit form, in case they have edit current item
    // just call AddNewEmployee();

    this.AddNewEmployee();
  }

  AddNewEmployee()
  {
    this.employeeDTOItem = { 
      employeeId : 0, 
      employeeGruid: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      positionId: 1,
      positionName: "",
      comment: ""
    };

  }


}
