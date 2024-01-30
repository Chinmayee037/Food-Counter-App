import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
url = 'http://localhost:3000/users';

  constructor(public http: HttpClient) { }

  getAllCustomer(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
