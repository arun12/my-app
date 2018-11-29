import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'  //using this line no need add service class for provider in app.module.ts
})
export class LoginService extends DataService{
  constructor(http:Http) {
    super('http://localhost:3000/api/login',http);
   }
}
