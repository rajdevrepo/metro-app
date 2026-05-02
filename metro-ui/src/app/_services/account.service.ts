import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = environment.apiUrl;
 //apiUrl:string = 'http://localhost:5001/api';
  constructor(private http: HttpClient) { }
  public getuser(model: any) {
    return this.http.post<any>(this.apiUrl + 'account/validate-user', model).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
