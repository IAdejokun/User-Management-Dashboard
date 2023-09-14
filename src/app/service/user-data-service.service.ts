import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import { UserDataInterface } from '../user-data-interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  constructor( private http:HttpClient) { }

  baseUrl = 'https://64fc8b48605a026163ae9aae.mockapi.io/api/users/usersData'

  getUserData():Observable<any>{
    return this.http.get(`${this.baseUrl}`)
  }

  postUserData(newUserFormData:any):Observable<any>{
    return this.http.post(this.baseUrl, newUserFormData)
  }

}
