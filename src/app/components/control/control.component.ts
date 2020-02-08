import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { ControlState } from 'src/app/store/reduces/control.reducer';
import { Store, select } from '@ngrx/store';
import { ChangeControlValue } from 'src/app/store/actions';

import { faPause,faPlay,faForward,faBackward,faAlignJustify,faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent implements OnInit {
  faPause = faPause;
  faPlay = faPlay;
  faForward = faForward;
  faBackward = faBackward;
  faAlignJustify = faAlignJustify;
  faAngleDown = faAngleDown;
  play: boolean = false;
  clickedMyList: boolean = false;

  @ViewChild('audioElement') private audioElement: ElementRef;
  private controlStore$: Observable<ControlState>;
  public data: ControlState;
  private interval$: any;

  constructor(private store: Store<{ controlStore: ControlState }>) {
    this.controlStore$ = store.pipe(select('controlStore'));
  }

  ngOnInit() {
    this.controlStore$.subscribe(data => {
      // this.currentLineWidth = (data.currentTime / data.durationTime) * this.barWidth;
      this.data = data;
      // console.log(data, '-------------clicked song data');
    })
  }

  ngAfterViewInit(): void{
    let audio = this.audioElement.nativeElement;

    this.store.dispatch(new ChangeControlValue({
      key: 'audio',
      value: audio
    }));
    audio.addEventListener('canplay', () => {
      console.log(this.data.audio);
      // 检测到可以播放就直接开始播放
      this.data.audio.play();
      this.play = true;
    }, false);

    audio.addEventListener('play',()=> {
      let timeInterval: Observable<number> = interval(3000);
      this.interval$ = timeInterval.pipe().subscribe(() => {
        this.store.dispatch(new ChangeControlValue({
          key: 'currentTime', 
          value: Math.floor(this.data.audio.currentTime * 1000)
        }));
      });
    })

    audio.addEventListener('pause', () => {
      this.interval$.unsubscribe();
    }, false);
  }

  //handle the play button
  handlerPlay(){
    let { audio, status } = this.data;
    let newStatus = status=='pause' ? 'play' : 'pause';
    if(newStatus == 'play'){
      audio.play();
    }
    if(newStatus == 'pause'){
      audio.pause();
    }
    this.store.dispatch(new ChangeControlValue({ key: 'status', value: newStatus }));
  }

  clickMyList(){
    this.clickedMyList = !this.clickedMyList;
  }
}
