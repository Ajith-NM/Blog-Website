import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private service:ApiService){}
  ngOnInit(): void {
    this.home={}
    
    let num=Math.floor(Math.random()*5)
    this.add_image(num)

  }
 
  home:any={}
 add_image(num:number){
  
    this.home=this.service.home_images[num]
  
  

 }
  
}
