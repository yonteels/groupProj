import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Import your root component
import { config } from './app/app.config.server';  // Import your merged application config

const bootstrap = () => bootstrapApplication(AppComponent, config);  // Bootstrap the application with config

export default bootstrap;  // Export the bootstrap function for the server
