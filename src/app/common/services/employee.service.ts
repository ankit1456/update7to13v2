import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DataService {

  constructor(http:HttpClient){
    super( 'https://kochar-server.herokuapp.com/api/v1/employees',http)
  }
}
