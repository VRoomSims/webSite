import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { SignUpComponent } from '../sign-up/sign-up.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isHide = true;
  checkButton = true ;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(  private dialogref : MatDialog,private authService: AuthService, private toast: HotToastService, private router: Router) { }

  ngOnInit(): void {
  }
  opendialogg(){
    this.dialogref.open(SignUpComponent);
  }


  switchToggleIcon(){
    this.checkButton = false ;

  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  switchLoginButton() {

      if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(

      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: ({ message }) => `There was an error: ${message} `
      })
    ).subscribe(() => {
      localStorage.setItem("email",email);
      this.dialogref.closeAll();
      this.router.navigate(['/']);
    });
    }










}
