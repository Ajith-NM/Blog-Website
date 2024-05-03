import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private service: ApiService) { }
  ngOnInit(): void {
    this.service.profile_img.subscribe((image) => {
      this.default_User = image
    })
    this.service.user_profile.subscribe((user) => {
      this.current_user = user
      if (user!="user") {
        this.default_User=`data:${user.extention};base64,${user.profile_img}`
      }
     
    })


  }
  current_user: any
  default_User = ""
}
