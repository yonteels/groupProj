import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';  // Import your main app module
import { AppComponent } from './app.component';  // Import your root component

@NgModule({
  imports: [
    AppModule,  // Import the main application module
    ServerModule,  // Import Angular's server module
  ],
  bootstrap: [AppComponent],  // Bootstrap the root component
})
export class AppServerModule {}
