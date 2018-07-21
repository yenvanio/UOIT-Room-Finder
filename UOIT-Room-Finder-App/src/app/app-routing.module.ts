import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeResolver } from './resolvers/home.resolver';
import { SearchTimeComponent } from './pages/search-time/search-time.component';
import { SearchRoomComponent } from './pages/search-room/search-room.component';
import { HelpComponent } from './pages/help/help.component';

const appRoutes: Routes = [
  {
    path: 'app',
    redirectTo: 'app/home',
    pathMatch: 'full'
  },
  {
    path: 'app/home',
    component: HomeComponent,
    resolve: {
      classes: HomeResolver
    }
  },
  {
    path: 'app/search/time',
    component: SearchTimeComponent,
  },
  {
    path: 'app/search/room',
    component: SearchRoomComponent,
  },
  {
    path: 'app/help',
    component: HelpComponent,
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
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
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
