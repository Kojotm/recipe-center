import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Token } from '../models/token';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly endpoint = 'api/user';
  pipe = new DatePipe('en-US');

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {
  }

  login(login : Login): Observable<Token> {
    return this.http.post<Token>(`${environment.apiEndpoint}${this.endpoint}/login`, login);
  }

  register(user: User) {
    return this.http.post(`${environment.apiEndpoint}${this.endpoint}/register`, user);
  }
}
