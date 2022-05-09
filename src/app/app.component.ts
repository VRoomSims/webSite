import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { SplashAnimationType } from "./splash-animation-type";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./register/register.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  windowWidth!: string;
  splashTransition!: string;
  opacityChange: number = 1;
  showSplash = true;

  @Input() animationDuration: number = 0.5;
  @Input() duration: number = 3;
  @Input() animationType: SplashAnimationType = SplashAnimationType.SlideLeft;
  user$ = this.usersService.currentUserProfile$;

  constructor(
    private dialogref : MatDialog,
    private authService: AuthService,
    public usersService: UsersService,
    private router: Router
  ) {}
  opendialog(){
   this.dialogref.open(LoginComponent);
  }
  ngOnInit(): void {



    setTimeout(() => {
      let transitionStyle = "";
      switch (this.animationType) {
        case SplashAnimationType.SlideLeft:
          this.windowWidth = "-" + window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case SplashAnimationType.SlideRight:
          this.windowWidth = window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case SplashAnimationType.FadeOut:
          transitionStyle = "opacity " + this.animationDuration + "s";
          this.opacityChange = 0;
      }

      this.splashTransition = transitionStyle;

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, this.animationDuration * 1000);
    }, this.duration * 1000);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  sendDataToLocalStorage(){
    localStorage.setItem("roomname","");
  }
}
