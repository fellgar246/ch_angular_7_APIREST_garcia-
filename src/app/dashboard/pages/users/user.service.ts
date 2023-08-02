import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, of, take, map } from 'rxjs';

const USER_DB: Observable<User[]> = of([
  {
    id: 1,
    name: 'Juan',
    lastName: 'Perez',
    email: 'juan@mail.com',
    age: 25,
    course: 'Angular',
    password: '1234'
  },
  {
    id: 2,
    name: 'Maria',
    lastName: 'Gomez',
    email: 'maria@email.com',
    age: 30,
    course: 'React',
    password: '1234'
  },
]).pipe(delay(500));

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor() {}

  loadUsers(): void {
    USER_DB.subscribe({
      next: (usuariosFromDb) => this._users$.next(usuariosFromDb)
    })
  }

  getUsers(): Subject<User[]> {
    return this._users$
  }

  getUserById(id: Number): Observable<User | undefined> {
    return this.users$.pipe(
      map((users) => users.find((user) => user.id === id)),
      take(1)
    )
  }

  createUser(user: CreateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([
          ...arrayActual,
          {...user, id: arrayActual.length + 1}
        ])
      }
    })
  }

  updateUserById(id: Number, usuarioActualizado: UpdateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(
          arrayActual.map((user) =>
            user.id === id ? { ...user, ...usuarioActualizado } : user
          )
        )
      }
    })
  }

  deleteUserById(id: Number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual) =>
        this._users$.next(arrayActual.filter((user) => user.id !== id))
    })
  }

}
