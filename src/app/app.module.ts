import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// Components
import {AppComponent} from './app.component';
import {CardComponent} from './card/card.component';
import {SidebarComponent} from './sidebar/sidebar.component';

// Prime NG
import {DropdownModule, SliderModule} from 'primeng';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
