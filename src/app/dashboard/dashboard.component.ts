import { EmployeeService } from "./../common/services/employee.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { EmployeeModel } from './employee.model';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  employees: any;
  showAdd: boolean = true;
  showUpdate: boolean = true;

  employeeModelObj: EmployeeModel = new EmployeeModel();

  constructor(
    private formbuilder: FormBuilder,
    private service: EmployeeService
  ) {}

  ngOnInit(): void {
  
    this.formValue = this.formbuilder.group({
      employeeName: [""],
      email: [""],
      mobile: [""],
      age: [18],
    });
    this.getAllEmployees()
  }



  getAllEmployees(){
    this.service.getAll().subscribe({
      next: (employees: any) => {
        this.employees = employees.data.docs;
      },
    });
  }
  AddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createEmployee() {
    this.employeeModelObj.employeeName = this.formValue.value.employeeName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.age = this.formValue.value.age;

   

    this.service.create(this.employeeModelObj).subscribe(
      (res) => {
        alert('Employee added successfully 😊');
        let ref = document.getElementById('cancel');
        ref?.click()
        this.formValue.reset();
        this.getAllEmployees();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  onEdit(row: any) {
    this.employeeModelObj.id = row._id;
    this.showAdd = false;
    this.showUpdate = true;
    this.formValue.controls['employeeName'].setValue(row.employeeName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['age'].setValue(row.age);
  }

  updateEmployee() {
    this.employeeModelObj.employeeName = this.formValue.value.employeeName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.age = this.formValue.value.age;

    this.service.update( this.employeeModelObj.id,this.employeeModelObj)
      .subscribe((res) => {
        alert('Updated successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployees();
      });
  }


  deleteEmployee(row: any) {
    this.service.delete(row._id).subscribe((res) => {
      alert('Employee deleted successfully');
      this.getAllEmployees();
    });
  }
}
