import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: { key: string, value: any }, ...args: unknown[]): unknown {
    const errorMessages: Record<string, string> = {
      required: 'Este campo es requerido',
      email: 'El email no es válido',
      minlength: `El mínimo de caracteres es ${error.value.requiredLength}`,
      min: `El valor mínimo es ${error.value.min}`,
      max: `El valor máximo es ${error.value.max}`,
    }
    return errorMessages[error.key];
  }
}
