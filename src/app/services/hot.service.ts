import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotService {

  constructor(private http: HttpClient) {
  }

  // 热门歌单推荐
  popularList() :any{
    return this.http.get('/api/personalized');
  }

  // 轮播图
  loopList() :any{
    return this.http.get('/api/banner');
  }

  // 获取歌单详情
  songListDetail(data: any) :any{
    return this.http.get(`/api/playlist/detail?id=${data.id}`);
  }
}