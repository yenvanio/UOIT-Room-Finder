import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {ErrorComponent} from './pages/error/error.component';

const appRoutes: Routes = [
  {
    path: 'app',
    component: HomeComponent
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
