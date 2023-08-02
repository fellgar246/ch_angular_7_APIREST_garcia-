import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take, of, map } from 'rxjs';
import { Category, UpdateCategoryData } from './models';

const CATEGORY_DB: Observable<Category[]> = of([
  {
    id: 1,
    name: 'Frontend',
    description: 'lorem ipsum',
  },
  {
    id: 2,
    name: 'Backend',
    description: 'lorem ipsum',
  },
  {
    id: 3,
    name: 'Bases de Datos',
    description: 'lorem ipsum',
  },
])

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories$ = new BehaviorSubject<Category[]>([]);
  private categories$ = this._categories$.asObservable();

  constructor() { }

  getCategories(): Subject<Category[]> {
    return this._categories$
  }

  loadCategories(): void {
    CATEGORY_DB.subscribe({
      next: (categoriesFromDb) => this._categories$.next(categoriesFromDb)
    })
  }

  createCategories(category: Category):void {
    this.categories$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._categories$.next([
          ...arrayActual,
          {...category, id: arrayActual.length + 1}
        ]);
      }
    })
  }

  updateCategoryById(id: Number, categoryUpdated:UpdateCategoryData ): void {
    this.categories$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._categories$.next(
          arrayActual.map((category) =>
            category.id === id ? { ...category, ...categoryUpdated } : category
            )
        )
      }
    })
  }

  deleteCategoryById(id: Number): void {
    this.categories$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._categories$.next(
          arrayActual.filter(category => category.id !== id)
        );
      }
    })
  }
}

