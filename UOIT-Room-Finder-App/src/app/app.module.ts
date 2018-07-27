import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SearchTimeComponent } from './pages/search-time/search-time.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeResolver } from './resolvers/home.resolver';
import { HomeService } from './services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SearchRoomComponent } from './pages/search-room/search-room.component';
import { HelpComponent } from './pages/help/help.component';
import { FutureClassComponent } from './pages/future-class/future-class.component';
import { FutureClassResolver } from './resolvers/future-class.resolver';
import { RoomResolver } from './resolvers/room.resolver';
import { environment } from '../environments/environment';
import {HashLocationStrategy, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    SearchTimeComponent,
    SearchRoomComponent,
    FutureClassComponent,
    HelpComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: environment.production ? HashLocationStrategy : PathLocationStrategy
    },
    HomeResolver,
    HomeService,
    FutureClassResolver,
    RoomResolver,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    MatMomentDateModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
