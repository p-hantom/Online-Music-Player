import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TopListState, AllTopListsState } from 'src/app/store/reduces/list.reducer';
import { LoadTopListData, LoadAllListsData } from 'src/app/store/actions/list.actions';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core'
import { ControlState } from 'src/app/store/reduces/control.reducer';
import { ChangeControlValue, LoadSongUrl } from 'src/app/store/actions';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { trigger, state, style, animate, transition, query, stagger, } from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(10000)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('tipListAnimation', [
      transition(':enter', [
        query('.nav-item', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
  ]
})
export class ListComponent implements OnInit {
  faPlay=faPlay;
  idx: number = 0;  //index of selected top list

  public topListStore$: Observable<TopListState>;
  public topListData: TopListState = {
    topList: [],
    totalData: []
  };

  public allTopListStore$: Observable<AllTopListsState>;
  public allTopListData: AllTopListsState = {
    topList: []
  };

  onClickedSong(data: any):void{
    console.log(data,"clicked item!!!!!")
    let currentId: number = data.id;
    
    this.store.dispatch(new ChangeControlValue({key: 'currentId', value: currentId}));
    this.store.dispatch(new ChangeControlValue({
      key: 'current', value: data ? data.index : 0
    }));
    this.store.dispatch(new ChangeControlValue({
      key: 'playList', value: this.topListData
    }));
    this.store.dispatch(new ChangeControlValue({
      key: 'coverUrl', value: data.al.picUrl
    }));
    this.store.dispatch(new ChangeControlValue({
      key: 'artist', value: data.ar
    }));
    this.store.dispatch(new ChangeControlValue({
      key: 'name', value: data.name
    }));
    this.store.dispatch(new LoadSongUrl(currentId));
    
  }

  toplistOnClick(index){
    this.store.dispatch(new LoadTopListData(index));
    this.idx = index;
    console.log(this.idx);
    // this.idx = +this.route.snapshot.paramMap.get('index');
  }

  constructor(private store: Store<{ 
        topListStore: TopListState, 
        allTopListStore: AllTopListsState,
        controlStore: ControlState,
      }>,
      private route: ActivatedRoute,
      private router: Router) {
    this.topListStore$ = store.pipe(select('topListStore'));
    this.allTopListStore$ = store.pipe(select('allTopListStore'));
  }

  ngOnInit() {
    this.store.dispatch(new LoadTopListData(0));
    this.store.dispatch(new LoadAllListsData());

    this.topListStore$.subscribe(data => {
      this.topListData = data;
      // console.log("hot top lists----------");
      // console.log(data,"hot top lists----------")
    });

    this.allTopListStore$.subscribe(data => {
      this.allTopListData = data;
      
      console.log(data)
    })

  }

}
