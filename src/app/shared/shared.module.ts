import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { FullNamePipe } from './pipes/full-name.pipe';
import { ControlErrorMessagePipe } from './pipes/control-error-message.pipe';
import { TitlesDirective } from './directives/titles.directive';

@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagePipe,
    TitlesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    FullNamePipe,
    ControlErrorMessagePipe,
    TitlesDirective
  ]
})
export class SharedModule { }
