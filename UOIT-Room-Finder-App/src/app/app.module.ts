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



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    SearchTimeComponent,
  ],
  providers: [
    HomeResolver,
    HomeService
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
