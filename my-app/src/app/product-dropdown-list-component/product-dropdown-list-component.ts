import { Component } from '@angular/core';
import { Product } from '../classes/IProduct';

@Component({
  selector: 'app-product-dropdown-list-component',
  standalone: false,
  styleUrl: './product-dropdown-list-component.css',
  templateUrl: './product-dropdown-list-component.html',
})
export class ProductDropdownListComponent {

  //Array of Product objects
  products: Product[] = [
    { id: 1, name: "Iphone 14", price: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr5sdSY9YRu4QsJLb3dsqkZS-e-MJwloZQzkK_8c3FPQ&s=10" },
    { id: 2, name: "Iphone 15", price: 15, image: "https://www.google.com/imgres?q=meme&imgurl=https%3A%2F%2Fcdn2.fptshop.com.vn%2Funsafe%2F1920x0%2Ffilters%3Aformat(webp)%3Aquality(75)%2F2024_4_29_638499526596064976_stonk-meme.jpg&imgrefurl=https%3A%2F%2Ffptshop.com.vn%2Ftin-tuc%2Fthu-thuat%2Fstonk-meme-184082&docid=iWFNyBaOAnHRVM&tbnid=BmLhzrTN-gWoZM&vet=12ahUKEwiGi_eL9vaWAxWUoWMGHYacNUYQnPAOegUI2wUQAA..i&w=1920&h=1280&hcb=2&ved=2ahUKEwiGi_eL9vaWAxWUoWMGHYacNUYQnPAOegUI2wUQAA" },
    { id: 3, name: "Iphone 18", price: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QMQoJlOR9lGL_1AUbvDT-6-KrdrfJw8psHBvfmjxFg&s=10" },
  ]
}
