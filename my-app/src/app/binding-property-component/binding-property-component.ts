import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-property-component',
  standalone: false,
  styleUrl: './binding-property-component.css',
  templateUrl: './binding-property-component.html',
})
export class BindingPropertyComponent {
  public name: string ="Vy Tam Nhu";
  public email: string ="nhuvtk24411@st.uel.edu.vn";
  public nameid: string ="nameid";
  public emailid: string="emailid";
  public isDisable: boolean=true;
  public hello: string="Hello!!!!!!"

}
