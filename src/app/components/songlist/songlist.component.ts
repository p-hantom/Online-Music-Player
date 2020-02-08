import { Component, OnInit, Input, Output } from '@angular/core';
import { faPlay, faPause, faPlus } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core'
import { trigger, state, style, animate, transition, } from '@angular/animations';
import { Store } from '@ngrx/store';
import { ControlState } from 'src/app/store/reduces/control.reducer';
import { AddToMyList } from 'src/app/store/actions';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.less'],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class SonglistComponent implements OnInit {
  faPlay=faPlay;
  faPause = faPause;
  faPlus = faPlus;
  @Input() item;
  @Input() i : number;  //rank number
  @Output() clicked = new EventEmitter();

  onClickSong(data: any){
    this.clicked.emit(data);  //listened in list.component.ts //why not dispatch actions here???
    this.addToMyList(data);
  }

  addToMyList(data: any){
    this.store.dispatch(new AddToMyList(data));
  }

  constructor(private store: Store<{ 
    controlStore: ControlState,
  }>) { }

  ngOnInit() {
  }

}
