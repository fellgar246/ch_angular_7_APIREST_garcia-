import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(
    private notifier: NotifierService,
    private router: Router,
    private httpClient: HttpClient
  ) {}


  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        token: localStorage.getItem('token') || 'invalido'
      }
    }). pipe(
      map((response) => {
        return !!response.length
      })
    )
  }

  login(payload: LoginPayload): void {
    this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if(response.length){
          const authUser = response[0];
          this._authUser$.next(response[0]);
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', authUser.token)
        }else{
          this.notifier.showError('Dato no válido','Email o contrasena invalida');
          this._authUser$.next(null);
        }
      },
      error: (err) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.notifier.showError('Error','Email o contraseña inválida');
          }
          this.notifier.showError('Error','Ha ocurrido un error');
        }
        this._authUser$.next(null);
      }
    })
  }
}
