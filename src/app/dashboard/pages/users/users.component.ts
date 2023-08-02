import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users: Observable<User[]>;

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private notifier: NotifierService,
    ) {
      this.userService.loadUsers();
      this.users = this.userService.getUsers();
    }

  onCreateUser(): void {
    this.matDialog
      .open(UserFormDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if(value){
            this.userService.createUser(value);
            this.notifier.showSuccess('Usuarios cargados', 'Los usuarios se cargaron correctamente');
            console.log('Recibimos el valor',value);
          }else {
            console.log('No recibimos nada');
          }
        }
      })
  }

  onDeleteUser(userToDelete: User): void {
    if(confirm(`¿Está seguro de eliminar al usuario ${userToDelete.name}?`)){
      this.userService.deleteUserById(userToDelete.id);
      this.notifier.showSuccess('Usuario eliminado', 'El usuario se eliminó correctamente');
    }
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
    .open(UserFormDialogComponent, {
      data: userToEdit,
    })
    .afterClosed()
    .subscribe({
      next: (userUpdated) => {
        if(userUpdated){
          this.userService.updateUserById(userToEdit.id,userUpdated);
          this.notifier.showSuccess('Usuario actualizado', 'El usuario se actualizó correctamente');
        }
      }
    })
  }
}
