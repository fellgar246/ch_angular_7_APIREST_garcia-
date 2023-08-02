import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {

  editingUser?: User;

  nameControl = new FormControl<String | null>(null, [Validators.required, Validators.minLength(2)]);
  lastNameControl = new FormControl<String | null>(null, [Validators.required]);
  emailControl = new FormControl<String | null>(null, [Validators.required, Validators.email]);
  ageControl = new FormControl<Number | null>(null, [Validators.required, Validators.min(10), Validators.max(100)]);
  courseControl = new FormControl<String | null>(null, [Validators.required]);

  userForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    age: this.ageControl,
    course: this.courseControl,
  });


  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: User,
  ) {

    if(this.data){
      this.editingUser = this.data;
      this.nameControl.setValue(this.data.name);
      this.lastNameControl.setValue(this.data.lastName);
      this.emailControl.setValue(this.data.email);
      this.ageControl.setValue(this.data.age);
      this.courseControl.setValue(this.data.course);
    }
  }

  onSubmit(): void {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
