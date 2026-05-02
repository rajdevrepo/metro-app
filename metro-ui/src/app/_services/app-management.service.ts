import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppManagementService {
  private apiUrl = environment.apiUrl;
  //apiUrl:string = 'http://localhost:5001/api';
  constructor(private http: HttpClient) { }
  public getstationlist(model: any) {
    return this.http.post<any>(this.apiUrl + 'appmanagement/getstationlist', model).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
  public insert_newrequest(model: any) {
    return this.http.post<any>(this.apiUrl + 'appmanagement/insert-newrequest', model).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
  public getpendingapproval(model: any) {
    return this.http.post<any>(this.apiUrl + 'appmanagement/get-pendingapproval', model).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
  public getrequestapplndetl(model: any) {
    return this.http.post<any>(this.apiUrl + 'appmanagement/get-requestapplndetl', model).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
  public insertrequestapproval(model: any) {
    return this.http.post<any>(this.apiUrl + 'appmanagement/insert-newrequest-approval', model).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
  public getcategorywisecount(model: any) {
    return this.http.post<any>(this.apiUrl + 'appmanagement/get-categorywisecount', model).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
