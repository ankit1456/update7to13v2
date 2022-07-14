import { BadInput } from './../common/bad-input';
import { AppError } from './../common/app.error';
import { AuthService } from '../common/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      passwordConfirm: ['',Validators.required],
    });
  }

  register(){
    this.service.register(this.registerForm.value).subscribe({
      next:response=>{
        alert('Account created Successfully 😁');
          this.registerForm.reset();
          if (response) this.router.navigate(['dashboard']);
      },
      error: (error: AppError) => {
        if (error instanceof BadInput) alert('Provide valid credentials');
        else throw error;
      },
    })
  }



  get userName() { return this.registerForm.get('userName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }

}
