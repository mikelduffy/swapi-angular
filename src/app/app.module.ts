import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { RootComponent } from './components/root/root.component';
import { LogoComponent } from './components/logo/logo.component';
import { TableComponent } from './components/table/table.component';
import { EpisodeSelectorComponent } from './components/episode-selector/episode-selector.component';

// Services
import { SwapiService } from './services/swapi/swapi.service';

@NgModule({
  declarations: [
    RootComponent,
    TableComponent,
    LogoComponent,
    EpisodeSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SwapiService],
  bootstrap: [RootComponent]
})
export class AppModule { }
