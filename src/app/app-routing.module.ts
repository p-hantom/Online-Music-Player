import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component'
import { HotComponent } from './components/hot/hot.component'

const routes: Routes = [
  { path: 'list/:index', component: ListComponent},
  { path: 'list', redirectTo: '/list/0', pathMatch: 'full'},
  { path: 'hot', component: HotComponent},
  { path: '', redirectTo: '/list/0', pathMatch: 'full'},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
