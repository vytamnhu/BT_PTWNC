import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule từ @angular/common

@Component({
  selector: 'app-course-registration-reactive-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule // 2. Thêm CommonModule vào đây để dùng pipe uppercase
  ],
  styleUrl: './course-registration-reactive-component.css',
  templateUrl: './course-registration-reactive-component.html',
})
export class CourseRegistrationReactiveComponent {

  public regForm: FormGroup = new FormGroup(
    {
      name: new FormControl('Trần Duy Thanh', [
        Validators.required,
        Validators.minLength(3),
        this.customNameValidator
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      password: new FormControl('', [
        Validators.required,
        this.strongPasswordValidator
      ]),

      confirmPass: new FormControl('', [
        Validators.required
      ])
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  setDefaultValues() {
    this.regForm.patchValue({
      name: 'Trần Duy Thanh',
      email: 'thanhtd@uel.edu.vn'
    });
  }

  customNameValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const hasSpecialCharacter = /[@#$%^&]/.test(control.value);

    return hasSpecialCharacter
      ? { nameNotMatch: { value: control.value } }
      : null;
  }

  strongPasswordValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const value = control.value;

    if (!value) {
      return null;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_-]).{8,}$/;

    return strongPasswordRegex.test(value)
      ? null
      : { weakPassword: true };
  }

  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password');
    const confirmPass = control.get('confirmPass');

    if (
      password &&
      confirmPass &&
      password.value !== confirmPass.value
    ) {
      return { mismatch: true };
    }

    return null;
  }

  onSubmit(){
    if (this.regForm.valid){
      console.log('Dữ liệu gửi đi:', this.regForm.value);
      let infor=JSON.stringify(this.regForm.value);
      alert("Xử lý dữ liệu:\n" + infor)
    }
  }
}