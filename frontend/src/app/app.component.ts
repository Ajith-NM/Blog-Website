import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private service: ApiService,private route:Router) { }
  ngOnInit(): void {
    this.service.profile_img.subscribe((image) => {
      this.default_User = image
    })
    this.service.user_profile.subscribe((user) => {
     
      this.current_user = user
      if (user!="user") {
        this.default_User=`data:${user.extention};base64,${user.profile_img}`
        this.username=user.username
      }
     
    })
this.service.getuser().subscribe((data:any)=>{
this.service.updateuser(data)
})

  }
  current_user: any
  default_User = ""
  username='name'

  open = "open"
  pf_click = false
  pfClicked() {
    this.pf_click = !this.pf_click


  }
  menu=false
  menuopen="open-menu"
  open_menu(){
this.menu=!this.menu
  }
  view = "view"
  pf_img_view = false
  pfimgview() {
    this.pf_img_view = !this.pf_img_view
  }

  logout(){
   this.service.getLogout().subscribe((data:any)=>{
    if (data=="logout") {
      window.location.reload()
    }
   })
  }

}
