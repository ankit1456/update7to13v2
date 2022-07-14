import { Router } from '@angular/router';
import { NotFoundError } from './../common/not-found.error';
import { AppError } from './../common/app.error';
import { AuthService } from '../common/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit() {
  }

  constructor(private service: AuthService,fb: FormBuilder,private router: Router) {
    this.loginForm = fb.group({
      email: ['', 
        Validators.required, 
      ],
      password: ['', Validators.required],
    });
  }

  login(){
    this.service.login(this.loginForm.value).subscribe({
      next:response=>{
        alert('Logged in Successfully 😁');
        this.loginForm.reset();
        if (response) this.router.navigate(['dashboard']);
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) alert('User not found');
        else throw error;
      },
    })
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
 
}
