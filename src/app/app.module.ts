import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { SongComponent } from './components/song/song.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { HotComponent } from './components/hot/hot.component';
import { ListComponent } from './components/list/list.component';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';

import { reducers } from './store/reduces'
import { EffectsModule } from '@ngrx/effects';
import { ListEffects } from './store/effects/list.effects';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { ControlComponent } from './components/control/control.component';
import { SonglistComponent } from './components/songlist/songlist.component';
import { ControlEffects } from './store/effects/control.effects';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyListComponent } from './components/my-list/my-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    PlayListComponent,
    HotComponent,
    ListComponent,
    NavbarComponent,
    FormatTimePipe,
    ControlComponent,
    SonglistComponent,
    MyListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ListEffects, ControlEffects]),
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
