import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-myblogs',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './myblogs.component.html',
  styleUrl: './myblogs.component.css'
})
export class MyblogsComponent implements OnInit{
  constructor(private service:ApiService ,private router:Router){}
  message:string=""
  my_Blogs:any
  user:any
  ngOnInit(): void {
    // this.service.user_profile.subscribe((user)=>{
    //   this.current_user=user
    // })
    this.service.myblogs.subscribe((MyBlogs)=>{
      this.my_Blogs=MyBlogs.my_Blogs
      this.user=MyBlogs
    })
   this.service.getMyblogs().subscribe((data:any)=>{
      console.log(data);
     if (data=="invalid user") {
      this.message="Please login "
     } 
     else if(data=="No Blogs"){
     this.message="no blogs are created"
     }
     else {
      this.my_Blogs=data.my_Blogs
      this.user=data
      //console.log("user created blogs",this.my_Blogs);
      this.service.updateMyBlogs(data)
      
     }
      
    })
  }

  view(id:any){
    console.log(id);
  this.router.navigateByUrl(`/blogview/${id}`)
   

  }
}
