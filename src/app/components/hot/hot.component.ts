import { Component, OnInit } from '@angular/core';
import { HotService } from '../../services/hot.service'

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css']
})
export class HotComponent implements OnInit {

  // constructor(private store: Store<{ hotStore: HotState) {
  //   this.hotStore$ = store.pipe(select('hotStore'));
  //   // this.controlStore$ = store.pipe(select('controlStore'));
  // }

  // ngOnInit() {
  //   this.store.dispatch(new LoadHotData());
  //   this.hotStore$.subscribe(data => {
  //     this.hotData = data;
  //   });
  //   this.controlStore$.subscribe(data => {
  //     this.miniPlayer = data.miniPlayer;
  //   })
  // }

  constructor(private hotService: HotService) { }

  ngOnInit() {
    console.log("hot works")
    // console.log(this.getPopularList());
    // this.getPopularList()
  }

  getPopularList(){
    this.hotService.popularList()
      .subscribe(list => console.log(list));
  }


}
