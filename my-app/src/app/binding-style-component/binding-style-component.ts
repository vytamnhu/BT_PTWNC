import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-style-component',
  standalone: false,
  styleUrl: './binding-style-component.css',
  templateUrl: './binding-style-component.html',
})
export class BindingStyleComponent {
  progressValue: number = 75; //Value range: 0-100
  statusColor: string ='red'; //Color based on processing logic

  //Check warning threshold
  isCritical(): boolean{
    return this.progressValue >80;
  }
}
