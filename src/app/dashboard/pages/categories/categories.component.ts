import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormDialogComponent } from './components/categories-form-dialog/categories-form-dialog.component';
import { Category } from './models';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { NotifierService } from '../../../core/services/notifier.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  public categories: Observable<Category[]>;

  constructor(
    private matDialog: MatDialog,
    private categoryService: CategoryService,
    private notifier: NotifierService,
    ) {
    this.categoryService.loadCategories();
    this.categories = this.categoryService.getCategories();
  }

  onCreateCategory(): void{
    this.matDialog
      .open(CategoryFormDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if(value){
            this.categoryService.createCategories(value);
            this.notifier.showSuccess('Categorias cargadas', 'Las categorias se cargaron correctamente');
            console.log('Recibimos el valor',value);
          }else {
            console.log('No recibimos nada');
          }
        }
      })
  }

  onDeleteCategory(categoryToDelete: Category): void {
    if(confirm(`¿Está seguro de eliminar la categoria ${categoryToDelete.name}?`)){
      this.categoryService.deleteCategoryById(categoryToDelete.id);
      this.notifier.showSuccess('Categoria eliminada', 'La categoria se eliminó correctamente');
    }
  }

  onEditCategory(categoryToEdit: Category): void {
    this.matDialog
    .open(CategoryFormDialogComponent, {
      data: categoryToEdit,
    })
    .afterClosed()
    .subscribe({
      next: (categoryUpdated) => {
        if(categoryUpdated){
          this.categoryService.updateCategoryById(categoryToEdit.id,categoryUpdated);
          this.notifier.showSuccess('Categoría actualizada', 'La categoría se actualizó correctamente');
        }
      }
    })
  }
}
