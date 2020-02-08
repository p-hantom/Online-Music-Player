import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private http: HttpClient) { }

  getSongUrl(data) {
    console.log(data, "control service")
    return this.http.get(`/api/song/url?id=${data.id}`);
  }
}
