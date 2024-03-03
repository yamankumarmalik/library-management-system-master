import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { login } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  // signal which store userAdmin Login value if logged in or not (by default Log In)
  userAdmin = signal(false);

  //base url for the json object
  url = 'http://localhost:4000/user-api/login';

  //function to check user credential from userLogin.json file
  checkUser(loginForm: any) {
    this.httpClient.post<any>(this.url, loginForm).subscribe({
      next: (res) => {
        if (res.message === 'login success') {
          //store token in local/session storage
          localStorage.setItem('token', res.token);
          //set user status & current user to service
          this.userAdmin.set(true);
          //navigate to books
          this.router.navigate(['/books']);
        }
      },
      error: (error) => {
        console.log('err in user login', error);
      },
    });
  }

  //function to add new user on the json server
  addNewUser(user: login) {
    return this.httpClient.post<login>(
      'http://localhost:4000/user-api/create-user',
      user
    );
  }

  //variable for the search service (a signal so the user knows when the status changes)
  searchStatus = signal('');
}
