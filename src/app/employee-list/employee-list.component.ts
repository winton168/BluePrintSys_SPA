import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

import { employeeDTO } from '../Models/employeeDTO';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @Input() inputEmployeeList: employeeDTO[] = [];

  @Output() EditItemEvent = new EventEmitter();

  @Output() DeleteItemEvent = new EventEmitter();

  employeeList: employeeDTO[] = [];

  constructor(private employeeService: EmployeeService) { 
   
  }

  ngOnInit(): void {

    this.employeeList = this.inputEmployeeList;
  }


  ngOnChanges()
  {
    this.employeeList = this.inputEmployeeList;
  }


   EditEmployee( employDTO: employeeDTO)
   {
    this.EditItemEvent.emit(employDTO);
    // alert(employDTO.employeeId);

   }

   DeleteEmployee( employDTo: employeeDTO)
   {
     // alert(employDTo.employeeId);
      this.employeeService.DeleteEmployee(employDTo).subscribe( response =>{
        this.DeleteItemEvent.emit();
      }, error => {
        console.log(error);
      })

      
   }

}
