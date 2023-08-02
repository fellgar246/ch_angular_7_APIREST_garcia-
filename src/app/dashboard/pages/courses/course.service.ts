import { Injectable } from '@angular/core';
import { CreateCourseData, UpdateCourseData, Course } from './models';
import { BehaviorSubject, Observable, Subject, delay, of, take } from 'rxjs';

const COURSE_DB: Observable<Course[]> = of([
  {
    id: 1,
    nameCourse: "Angular",
    typeCourse: "Frontend",
  },
  {
    id: 2,
    nameCourse: "React",
    typeCourse: "Frontend",
  },
  {
    id: 3,
    nameCourse: "Mongo",
    typeCourse: "Backend",
  },
  {
    id: 4,
    nameCourse: "SQL",
    typeCourse: "Bases de Datos",
  },
]).pipe(delay(500));

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _course$ = new BehaviorSubject<Course[]>([]);
  private course$ = this._course$.asObservable();

  constructor() {}

  loadCourses(): void {
    COURSE_DB.subscribe({
      next: (courseFromDb: Course[]) => this._course$.next(courseFromDb)
    })
  }

  getCourses(): Subject<Course[]> {
    return this._course$
  }

  createCourse(course: CreateCourseData): void {
    this.course$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._course$.next([
          ...arrayActual,
          {...course, id: arrayActual.length + 1}
        ])
      }
    })
  }

  updateCourseById(id: Number, courseActualizado: UpdateCourseData): void {
    this.course$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._course$.next(
          arrayActual.map((course) =>
            course.id === id ? { ...course, ...courseActualizado } : course
          )
        )
      }
    })
  }

  deleteCourseById(id: Number): void {
    this._course$.pipe(take(1)).subscribe({
      next: (arrayActual) =>
        this._course$.next(arrayActual.filter((course) => course.id !== id))
    })
  }

}
