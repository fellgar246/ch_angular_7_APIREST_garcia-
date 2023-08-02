import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss']
})
export class CourseFormDialogComponent {

  editingCourse?: Course;

  nameCourseControl = new FormControl<String | null>(null, [Validators.required, Validators.min(10), Validators.max(100)]);
  typeCourseControl = new FormControl<String | null>(null, [Validators.required]);

  courseForm = new FormGroup({
    nameCourse: this.nameCourseControl,
    typeCourse: this.typeCourseControl,
  });


  constructor(
    private dialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Course,
  ) {

    if(this.data){
      this.editingCourse = this.data;
      this.nameCourseControl.setValue(this.data.nameCourse);
      this.typeCourseControl.setValue(this.data.typeCourse);
    }
  }

  onSubmit(): void {
    if(this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
