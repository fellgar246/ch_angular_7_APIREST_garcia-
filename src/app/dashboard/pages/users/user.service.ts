import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, of, take, map, mergeMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService,private httpClient: HttpClient) {}

  loadUsers(): void {
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      headers: new HttpHeaders({
        'token': '123456'
      }),
      params: {
        page: 1
      }
    }).subscribe({
      next: (response) => {
        this._users$.next(response)

      },
      error: () => {
        this.notifier.showError('Error','Error al cargar los usuarios')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
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
    const token = generateRandomString(15)

    this.httpClient.post<User>(environment.baseApiUrl + '/users', {...user, token})
      .pipe(
        mergeMap((userCreated)=> this.users$.pipe(
          take(1),
          map(
            (arrayActual) => ([...arrayActual, userCreated])
          )
          )
        ),
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado);
        }
    })
  }

  updateUserById(id: Number, usuarioActualizado: UpdateUserData): void {
    this.httpClient.put<User>(environment.baseApiUrl + `/users/${id}`, usuarioActualizado).subscribe({
      next: ()=> this.loadUsers(),
    })
  }


  deleteUserById(id: Number): void {
    this.httpClient.delete(environment.baseApiUrl + `users/${id}`)
      .pipe(
        mergeMap(
          (responseUserDeleted) => this.users$.pipe(
            take(1),
            map((arrayActual) => arrayActual.filter((user) => user.id !== id))
          )
        )
      ).subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado);
        }
      })
  }


}
