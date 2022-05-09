import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { LandingComponent } from './components/landing/landing.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './components/profile/profile.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';
import { FeedComponent } from './chat/feed/feed.component';
import { MessageComponent } from './chat/message/message.component';
import { UserItemComponent } from './chat/user-item/user-item.component';
import { UserListComponent } from './chat/user-list/user-list.component';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ChatService } from './chat-service.service';
import { AuthService } from './shared/auth.service';
import { FormsModule } from '@angular/forms';
import { NouvellesComponent } from './nouvelles/nouvelles.component';
import { ClassementComponent } from './classement/classement.component';
import { EquipeComponent } from './equipe/equipe.component';
import { CUSTOM_ELEMENTS_SCHEMA,  } from '@angular/core';
import{ MatDialogModule} from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { AddRoomComponent } from './chat/add-room/add-room.component'
import { ToastrModule } from 'ngx-toastr';
import {NgToastModule} from "ng-angular-popup";
import { ChatRoomComponent } from './chat-room/chat-room.component';
import {MatRadioModule} from '@angular/material/radio';
import { ModalComponent } from './modal/modal.component';
import { DonationComponent } from './donation/donation.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LandingComponent,
    HomeComponent,
    ProfileComponent,
    ChatroomComponent,
    ChatFormComponent,
    FeedComponent,
    MessageComponent,
    UserItemComponent,
    UserListComponent,
    NouvellesComponent,
    ClassementComponent,
    EquipeComponent,
    RegisterComponent,
    AddRoomComponent,
    ChatRoomComponent,
    ModalComponent,
    DonationComponent,

  ],
  imports: [
    NgToastModule,
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(
    //   {
    //     timeOut : 1000 ,
    //     progressBar : true ,
    //     progressAnimation : 'increasing',
    //     preventDuplicates : true

    //   }
    // ),
    AngularFireModule.initializeApp(environment.firebase)

    ,
    MatInputModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    MatMenuModule,
    MatRadioModule,
  ],
providers: [ChatService,AuthService
,],
  bootstrap: [AppComponent],schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
