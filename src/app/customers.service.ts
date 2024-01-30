import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
// url = 'http://localhost:3000/users';
url = 'https://chinmayee037.github.io/Json-Data/db.json';

  constructor(public http: HttpClient) { }

  getAllCustomer(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  // updateCustomerStatus(id: number, status: string): Observable<any> {
  //   const updateUrl = `${this.url}/${id}`;
  //   return this.http.patch(updateUrl, { status });
  // }
}
