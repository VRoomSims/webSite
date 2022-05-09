import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import {User} from '../models/user.model'

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import {ProfileUser} from '../models/user'
import { TypeofExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName!: string | null;
  authState:any;
  email: string="";

  constructor(private fireauth: AngularFireAuth, private router: Router,
    private db: AngularFireDatabase) {
    this.fireauth.authState.subscribe((auth) => {
      if (auth !== undefined && auth !== null) {
       // this.user = auth;
        //this.userName = this.user.displayName;

      }
    });
  }
  getUser() {
   // const userId = this.user.uid;
   // const path = `/users/${userId}`;
   // return this.db.object(path);
  }
  authUser() {
   // return this.user;
  }
  // login method
  // login(email: string, password: string) {
  //   this.fireauth.signInWithEmailAndPassword(email, password).then(
  //     (res) => {
  //       const status ='enligne';
  //       localStorage.setItem('token', 'true');

  //       if (res.user?.emailVerified == true) {
  //         this.router.navigate(['/dashboard']);
  //         // this.userPrincipal$ = res.user;
  //         // console.log(res.user);
  //         localStorage.setItem('email', '' + res.user?.email);
  //       } else {
  //         this.router.navigate(['/varify-email']);
  //       }
  //     },
  //     (err) => {
  //       // alert(err.message);
  //       alert('Something went wrong');
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }




  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.setUserStatus('online');
          this.router.navigate(['/dashboard/chat']);
        });
  
  
  
  }


  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;

    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }













  // register method
  register(email: string, password: string, displayName: string) {
  //   this.fireauth.createUserWithEmailAndPassword(email, password).then(
  //     (res) => {
  //       alert('Inscription réussi');
  //       this.sendEmailForVarification(res.user);
  //       this.router.navigate(['/login']);
  //     },
  //     (err) => {
  //       alert(err.message);
  //       this.router.navigate(['/register']);
  //     }
  //   );
    return this.fireauth.createUserWithEmailAndPassword(email,password)
          .then((user)=>{
            this.authState = user;
            const status ='enligne'
            this.setUserData(email,displayName,status)
          }).catch(error =>console.log(error));




  }
  
  setUserData(email:string,displayName:string,status:string):void{
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status:status
    };
    this.db.object(path).update(data)
    .catch(error=>console.log(error));
    
  }

  get currentUserId(): string {
    return this.authState !==null ? this.authState.uid : '';
  }




















  profile() {
    this.router.navigate(['/dashboard/profile']);
  }
  chat() {
    this.router.navigate(['dashboard/chat']);
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Quelque chose s"est mal passé');
      }
    );
  }

  // forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/varify-email']);
      },
      (err) => {
        alert('Quelque chose s"est mal passé');
      }
    );
  }

  // email varification
  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/varify-email']);
      },
      (err: any) => {
        alert(
          'Quelque chose s"est mal passé. Impossible d"envoyer du courrier à votre adresse e-mail.'
        );
      }
    );
  }

  // sign in with google
  // googleSignIn() {
  //   return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

  //     this.router.navigate(['/dashboard']);
  //     localStorage.setItem('token',JSON.stringify(res.user?.uid));

  //   }, err => {
  //     alert(err.message);
  //   })
  // }
}

