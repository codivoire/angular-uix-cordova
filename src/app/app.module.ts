import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicModule } from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { UixModule } from "src/@uix/angular/core";
import { CoreModule } from "./core/core.module";

import { AppRoutingModule, ROUTING_COMPONENTS } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, ...ROUTING_COMPONENTS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    UixModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [StatusBar, SplashScreen],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
