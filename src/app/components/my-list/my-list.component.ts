import { Component, OnInit, Input } from '@angular/core';
import { faTrashAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { ControlState } from 'src/app/store/reduces/control.reducer';
import { DeleteFromMyList, ChangeControlValue, LoadSongUrl } from 'src/app/store/actions';
import { Observable } from 'rxjs';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.less'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class MyListComponent implements OnInit {
  faPlay = faPlay;
  faTrashAlt = faTrashAlt;
  mouseEntered: number = -1;
  @Input() list;
  private controlStore$: Observable<ControlState>;
  public data: ControlState;

  handlePlay(item){
    let currentId: number = item.id;
    
    this.store.dispatch(new ChangeControlValue({key: 'currentId', value: currentId}));
    this.store.dispatch(new ChangeControlValue({
      key: 'current', value: item ? item.index : 0
    }));
    // this.store.dispatch(new ChangeControlValue({
    //   key: 'playList', value: this.topListitem
    // }));
    this.store.dispatch(new ChangeControlValue({
      key: 'coverUrl', value: item.al.picUrl
    }));
    this.store.dispatch(new ChangeControlValue({
      key: 'artist', value: item.ar
    }));
    this.store.dispatch(new ChangeControlValue({
      key: 'name', value: item.name
    }));
    this.store.dispatch(new LoadSongUrl(currentId));
  }

  removeAllFromList(){
    this.store.dispatch(new ChangeControlValue({
      key: 'myList', value: []
    }));
  }

  mouseEnterItem(i: number){
    this.mouseEntered = i;
  }

  mouseLeaveItem(i: number){
    this.mouseEntered = -1;
  }

  deleteItem(item){
    this.store.dispatch(new DeleteFromMyList(item));
  }

  constructor(private store: Store<{ 
    controlStore: ControlState,
  }>) {
    this.controlStore$ = store.pipe(select('controlStore'));
  }

  ngOnInit() {
    this.controlStore$.subscribe((data) => {this.data=data})
  }

}
