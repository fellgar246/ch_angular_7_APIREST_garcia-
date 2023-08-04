import { Injectable } from '@angular/core';
import { CreateCourseData, UpdateCourseData, Course } from './models';
import { BehaviorSubject, Observable, Subject, delay, of, take, mergeMap, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _course$ = new BehaviorSubject<Course[]>([]);
  private course$ = this._course$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService,private httpClient: HttpClient) {}

  loadCourses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses').subscribe({
      next: (response) => {
        this._course$.next(response)

      },
      error: () => {
        this.notifier.showError('Error','Error al cargar los cursos')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }

  getCourses(): Subject<Course[]> {
    return this._course$
  }

  createCourse(course: CreateCourseData): void {
    this.httpClient.post<Course>(environment.baseApiUrl + '/courses', {...course })
      .pipe(
        mergeMap((courseCreated)=> this.course$.pipe(
          take(1),
          map(
            (arrayActual) => ([...arrayActual, courseCreated])
          )
          )
        ),
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._course$.next(arrayActualizado);
        }
    })
  }

  updateCourseById(id: Number, courseActualizado: UpdateCourseData): void {
    this.httpClient.put<Course>(environment.baseApiUrl + `/courses/${id}`, courseActualizado).subscribe({
      next: ()=> this.loadCourses(),
    })
  }

  deleteCourseById(id: Number): void {
    this.httpClient.delete(environment.baseApiUrl + `/courses/${id}`)
    .pipe(
      mergeMap(
        (responseCourseDeleted) => this.course$.pipe(
          take(1),
          map((arrayActual) => arrayActual.filter((course) => course.id !== id))
        )
      )
    ).subscribe({
      next: (arrayActualizado) => {
        this._course$.next(arrayActualizado);
      }
    })
  }
}
