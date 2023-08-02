import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormDialogComponent } from './components/categories-form-dialog/categories-form-dialog.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryFormDialogComponent,
    CategoriesTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CategoriesRoutingModule,
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
