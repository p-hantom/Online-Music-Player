import { Action } from '@ngrx/store';
import { ControlActionTypes } from '../actions';

export const controlFeatureKey = 'control';

export interface ControlAction extends Action {
  payload: any
}

const statusHandler = (state: ControlState, key: string, value: any): void => {
  console.log(state.audio);
};

const modifyArray = (data: any[]): string => {
  return data.map(item => item.name).join('/');
}

/**
 * @param loading 是否在加载
 * @param status 播放还是暂停
 * @param playList 播放列表
 * @param myList A list created by user
 * @param miniPlayer 小窗播放,播放最小化
 * @param player 大窗播放
 * @param audio audi标签
 * @param playListVisible 播放列表可见
 * @param src 播放地址
 * @param coverUrl 封面
 * @param currentTime 当前播放时间
 * @param durationTime 总时长
 * @param current 当前播放的歌曲
 * @param currentId 当前播放的歌曲id
 * @param artist [{id: number, name: String},...]
 */

export interface ControlState {
  loading?: boolean;
  status: string,
  playList: any[],
  myList: any[],
  miniPlayer: boolean,
  player: boolean,
  audio?: HTMLAudioElement,
  playListVisible: boolean,
  src: string,
  coverUrl: string,
  currentTime: number,
  durationTime: number,
  currentId?: number,
  current?: number,
  alia?: String,
  name?: String,
  album?: String,
  artist?: Array<any>
}

export const initialState: ControlState = {
  loading: false,
  status: 'pause',
  playList: [],
  myList: [],
  miniPlayer: false,
  player: false,
  playListVisible: false,
  src: '',
  coverUrl: '',
  currentTime: 0,
  durationTime: 252000,
  current: 0,
  alia: '',
  name: '',
  album: '',
  artist: [{id:0, name:''}]
};

export function controlReducer(state = initialState, action: ControlAction): ControlState {
  switch (action.type) {
    case ControlActionTypes.ToggleSong:
      console.log(action);
      return { ...state };

    case ControlActionTypes.ToggleStatus:
      console.log(action);
      return { ...state };

    case ControlActionTypes.RestControlData:
      console.log(action);
      return { ...state };

    case ControlActionTypes.LoadSongUrlSuccess:
      const { data } = action.payload;
      const musicInfo = state.playList[state.current];
      // console.log(data, "LoadSongUrlSuccess")
      return {
        ...state,
        src: data[0].url,
        status: 'play',
        // coverUrl: musicInfo.al.picUrl,
        // alia: modifyArray(musicInfo.ar),
        // name: musicInfo.al.name,
        // album: musicInfo.name
      };

    case ControlActionTypes.ChangeValue:
      console.log(action.payload.key," = ",action.payload.value);
      // statusHandler(state, action.payload.key, action.payload.value);
      return { ...state, [action.payload.key]: action.payload.value };
    
    case ControlActionTypes.AddToMyList:
      console.log(action.payload,"add to my list!!!");
      state.myList.push(action.payload);
      return {...state};

    case ControlActionTypes.DeleteFromMyList:
      const index: number = state.myList.indexOf(action.payload);
      if (index !== -1) {
        state.myList.splice(index, 1);
      }     
      return {...state};

    default:
      return state;
  }
}
