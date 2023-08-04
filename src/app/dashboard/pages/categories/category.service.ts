import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, take, map, mergeMap } from 'rxjs';
import { Category, UpdateCategoryData } from './models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories$ = new BehaviorSubject<Category[]>([]);
  private categories$ = this._categories$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService,private httpClient: HttpClient) { }

  loadCategories(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Category[]>(environment.baseApiUrl + '/categories').subscribe({
      next: (response) => {
        this._categories$.next(response)

      },
      error: () => {
        this.notifier.showError('Error','Error al cargar las categorias')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }


  getCategories(): Subject<Category[]> {
    return this._categories$
  }



  createCategories(category: Category):void {
    this.httpClient.post<Category>(environment.baseApiUrl + '/categories', {...category})
    .pipe(
      mergeMap((categoryCreated)=> this.categories$.pipe(
        take(1),
        map(
          (arrayActual) => ([...arrayActual, categoryCreated])
        )
        )
      ),
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._categories$.next(arrayActualizado);
      }
    })
  }

  updateCategoryById(id: Number, categoryUpdated:UpdateCategoryData ): void {
    this.httpClient.put<Category>(environment.baseApiUrl + `/categories/${id}`, categoryUpdated).subscribe({
      next: ()=> this.loadCategories(),
    })
  }

  deleteCategoryById(id: Number): void {
    this.httpClient.delete(environment.baseApiUrl + `/categories/${id}`)
      .pipe(
        mergeMap(
          (responseCategoryDeleted) => this.categories$.pipe(
            take(1),
            map((arrayActual) => arrayActual.filter((category) => category.id !== id))
          )
        )
      ).subscribe({
        next: (arrayActualizado) => {
          this._categories$.next(arrayActualizado);
        }
      })
  }
}

