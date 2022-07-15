import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { GoodsElementComponent } from './goods-element/goods-element.component';
import { GoodsCategoryService } from './service/goods-category.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    GoodsElementComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [GoodsCategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
