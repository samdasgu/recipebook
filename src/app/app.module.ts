import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app.routes';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      backdropBorderRadius: '0px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
