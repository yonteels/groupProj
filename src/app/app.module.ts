import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  
import { HttpClientModule } from '@angular/common/http'; 
@NgModule({
  declarations: [
    AppComponent,  // Declare your components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],  // Bootstrap the root component
})
export class AppModule {}
