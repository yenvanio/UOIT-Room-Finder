import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeResolver } from './resolvers/home.resolver';
import { FutureClassResolver } from './resolvers/future-class.resolver';
import { SearchTimeComponent } from './pages/search-time/search-time.component';
import { SearchRoomComponent } from './pages/search-room/search-room.component';
import { HelpComponent } from './pages/help/help.component';
import { FutureClassComponent } from './pages/future-class/future-class.component';
import { RoomResolver } from './resolvers/room.resolver';
import { MapResolver } from './resolvers/map.resolver';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      classes: HomeResolver
    }
  },
  {
    path: 'search/time',
    component: SearchTimeComponent,
  },
  {
    path: 'search/room',
    component: SearchRoomComponent,
    resolve: {
      rooms: RoomResolver
    }
  },
  {
    path: 'search/future',
    component: FutureClassComponent,
    resolve: {
      classes: FutureClassResolver,
      map: MapResolver
    }
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: ''}
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
