import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AboutComponent } from "./components/about.component";
import {DynamicChildLoaderDirective} from "./loadComponent.directive";


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DynamicChildLoaderDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
