import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SourceComponent } from './source-translation-input/source.component';
import { PlaygroundComponent } from './translation-playground/playground.component';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [AppComponent, SourceComponent, PlaygroundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
