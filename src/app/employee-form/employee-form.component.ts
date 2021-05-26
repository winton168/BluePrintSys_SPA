import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { PositionService } from '../services/position.service';
import { positionDTO } from '../Models/positionDTO';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { employeeInsertDTO } from '../Models/employeeInsertDTO';
import { employeeDTO } from '../Models/employeeDTO';
import { employeeUpdateDTO } from '../Models/employeeUpdateDTO';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

   @Input() employeeDTOInputItem: employeeDTO = {
    employeeId : 0, 
    employeeGruid: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    positionId: 1,
    positionName: "",
    comment: ""
   };

   @Output() ChildChanges = new EventEmitter();

    positions: positionDTO[] = [];
    employeeForm: FormGroup;
    successMessage: string = "";
    failedMessage: string = "";
    positionSelected: number = 1;
    employeeId: number = 0;

  constructor(private positionService: PositionService, private employeeService: EmployeeService) { 

    this.employeeForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      positionId: new FormControl('', [Validators.required, Validators.min(0)])
    });

  }

  ngOnInit(): void {

    this.positionService.getAllPosition().subscribe( response => {
        this.positions = response;
      // this.brands = [{id: 0, name: 'All'}, ...response];
      // this.positions = [ { positionId: -1, positionName: 'Please select position'}, ...response];
      console.log(response);
    }, error => {
      console.log(error);
    });

  }

  save(){
      console.log("save button clicked .");
      console.log( this.employeeForm.value );

      if ( this.employeeId > 0)
      {
        let employeeUpdateDTO : employeeUpdateDTO = {
          fullName: this.employeeForm.value.fullName,
          address: this.employeeForm.value.address,
          phoneNumber: this.employeeForm.value.phoneNumber,
          positionId: this.employeeForm.value.positionId,
          employeeId: this.employeeId
        } ;

        this.employeeService.UpdateEmployee(employeeUpdateDTO).subscribe( response  => {
              this.successMessage = response.actionMessage;
              this.ChildChanges.emit();
              console.log(response);
              this.failedMessage = "";
            }, error => {
              console.warn(error);
              this.successMessage = "";
            }
        );

      } else {

        let employeeInsertDTO : employeeInsertDTO = {
          fullName: this.employeeForm.value.fullName,
          address: this.employeeForm.value.address,
          phoneNumber: this.employeeForm.value.phoneNumber,
          positionId: this.employeeForm.value.positionId
        } ;
  
        this.employeeService.InsertEmployee(employeeInsertDTO).subscribe( response  => {
              this.successMessage = response.actionMessage;
              this.ChildChanges.emit();
              console.log(response);
             this.failedMessage = "";

            }, error => {
              console.warn(error);
              this.successMessage = "";
            }
        );

      }
     
  }


  ngOnChanges()
  {

    if ( this.employeeDTOInputItem.employeeId > 0 )
    {
      this.employeeId = this.employeeDTOInputItem.employeeId;
      this.employeeForm.patchValue({
        fullName: this.employeeDTOInputItem.fullName,
        address: this.employeeDTOInputItem.address,
        phoneNumber: this.employeeDTOInputItem.phoneNumber,
        positionId: this.employeeDTOInputItem.positionId
      });

    } else {
      this.employeeId = 0;
      this.positionSelected = 1;
      this.successMessage = "";
      this.failedMessage = "";
      this.employeeForm.reset();

      this.employeeForm.patchValue({
        positionId: 1
      });

    //   this.employeeForm.patchValue({
    //     fullName: '',
    //     address: '',
    //     phoneNumber: '',
    //     positionId: 1
    // });

  }

}


  // ResetForm(){
  //   this.employeeId = 0;
  //   this.employeeForm.setValue({
  //     fullName: '',
  //     address: '',
  //     phoneNumber: '',
  //     positionId: 1
  //   });
  // }

  //  CleanUpMessage(){
  //     this.employeeId = 0;
  //     this.successMessage = "";
  //     this.failedMessage = "";
  //  }




}
