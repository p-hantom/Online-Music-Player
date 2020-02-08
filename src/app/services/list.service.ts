import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  topList(data) {
    return this.http.get(`/api/top/list?idx=${data.index}`);
  }

  topListAll(){
    return this.http.get('./api/toplist');
  }
}
