import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicModule } from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { UixModule } from "src/@uix/angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppService } from "./shared/services/app.service"

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    UixModule.initialize({
      transition: "material"
    }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppService
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
