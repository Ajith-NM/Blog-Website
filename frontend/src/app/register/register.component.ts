import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private apiservice: ApiService, private route: Router) { }
  message: string = ''
  signup_img = "assets/profile/user2.jpeg"
  login_img = "assets/profile/user2.jpeg"
  active = "active"
  logClick = true
  signClick = false
  animatelogin = "animatelogin"
  animatesignin = "animatesignin"
  login_Click() {
    this.logClick = true
    this.signClick = false
    this.message = ''
  }
  signup_Click() {
    this.signClick = true
    this.logClick = false
    this.message = ''
  }
  //signup
  signup = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    profile_img: ['']

  })
  formdata = new FormData()
  upload(event: any) {
    this.formdata.delete("pf")
    const file = event.target.files[0]
    this.formdata.append("pf", file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let image1: any = reader.result
      this.signup_img = image1
    }
  }
  onSignup() {
    this.formdata.delete("username")
    this.formdata.delete("email")
    this.formdata.delete("password")
    let username: any
    let email: any
    let password: any

    username = this.signup.value.username
    email = this.signup.value.email
    password = this.signup.value.password

    this.formdata.append("username", username)
    this.formdata.append("email", email)
    this.formdata.append("password", password)

    console.log("S", this.signup.value);
    this.apiservice.postSignup(this.formdata).subscribe((data: any) => {
      console.log(data);


      if (data.status == "success") {
        this.logClick = true
        this.signClick = false
        let ext = data.ext
        let content = data.user
        this.login_img = `data:${ext};base64,${content}`


      }
      else {
        this.message = data.error + "!"
      }

    })
  }
  login = this.fb.group({
    username: [''],
    email: [''],
    password: [''],

  })

  onLogin() {
    console.log("L", this.login.value);
    this.apiservice.postLogin(this.login.value).subscribe((data: any) => {
      console.log(data);

      if (data == "invalid email") {
        this.message = data
      }
      else if (data.status == "success") {
        let extention = data.user.extention
        let img = data.user.profile_img
        this.apiservice.updateuser(data.user)
        this.apiservice.updateimage(`data:${extention};base64,${img}`)
        this.route.navigateByUrl('/home')
      }
      else {
        this.message = data.error
      }

    })
  }

}
