import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatListModule, MatProgressSpinnerModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MenuComponent} from './menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DishdetailComponent} from './dishdetail/dishdetail.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DishService} from './services/dish.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {LeaderService} from './services/leader.service';
import {PromotionService} from './services/promotion.service';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {baseURL} from './shared/baseurl';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,

    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,

    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,

    FlexLayoutModule,
    AppRoutingModule,
    MatSliderModule,

    HttpClientModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [DishService, PromotionService, LeaderService,
    {provide: 'BaseURL', useValue: baseURL}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
