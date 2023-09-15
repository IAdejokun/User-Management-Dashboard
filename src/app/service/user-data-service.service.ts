import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDataInterface } from '../user-data-interface';

@Injectable({
  providedIn: 'root',
})
export class UserDataServiceService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://64fc8b48605a026163ae9aae.mockapi.io/api/users/usersData';

  fetchUserData(): Observable<any> {
    return this.http.get<UserDataInterface>(`${this.baseUrl}`);
  }

  postUserData(newUserFormData: any): Observable<any> {
    return this.http.post<UserDataInterface>(this.baseUrl, newUserFormData);
  }

  putUserData(id: number, updatedData: any): Observable<any> {
    return this.http.put<UserDataInterface>(`${this.baseUrl}/${id}`,updatedData);
  }

  deleteUserData(id: number): Observable<any> {
    return this.http.delete<UserDataInterface>(`${this.baseUrl}/${id}`);
  }
}
