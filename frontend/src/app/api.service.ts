import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private client: HttpClient,) { }
  //user details
  private user = new BehaviorSubject<any>('user')
  public user_profile = this.user.asObservable()
  updateuser(usr: any) {
    this.user.next(usr)
  }
  //profile img of user
  private image = new BehaviorSubject<any>("assets/profile/user2.jpeg")
  public profile_img = this.image.asObservable();
  updateimage(img: string) {
    this.image.next(img);
  }

//allblogs
private Blogs = new BehaviorSubject<any>('')
  public All_blogs = this.Blogs.asObservable()
  updateBlogs(blg: any) {
    this.Blogs.next(blg)
  }
//myblogs
private MyBlogs = new BehaviorSubject<any>('')
  public myblogs = this.MyBlogs.asObservable()
  updateMyBlogs(blg: any) {
    this.MyBlogs.next(blg)
  }

  // http connections
  Base_url: string = "http://localhost:4000/"
  //get all blogs
  getBlogs() {
    return this.client.get(`${this.Base_url}blogs`)
  }
  //get userblogs
  getMyblogs() {
    return this.client.get(`${this.Base_url}myblogs`)
  }
  //for certain blog
  getBlogView(data: any) {
    return this.client.get(`${this.Base_url}view/${data}`)
  }
  //for signup
  postSignup(data: any) {
    return this.client.post(`${this.Base_url}signup`, data)
  }
  //for login 
  postLogin(data: any) {
    return this.client.post(`${this.Base_url}login`, data)
  }
//for logout
getLogout() {
  return this.client.get(`${this.Base_url}logout`)
}

  //for creating a blog
  postCreation(data: any) {
    return this.client.post(`${this.Base_url}creation`, data)
  }

  postComment(b_id: any,cmnt:any) {
    return this.client.post(`${this.Base_url}comment/${b_id}`, cmnt)
  }
  postReplay(c_id: any, rply: any) {
    return this.client.post(`${this.Base_url}replay/${c_id}`, rply)
  }
 postLike(data: any) {
    return this.client.post(`${this.Base_url}like/${data}`,"")
  }
 getdeletecmnt(bid:any,cid:any){
  return this.client.get(`${this.Base_url}deletecmnt/${bid}/${cid}`)
 }
 getdeleterply(id1:any,id2:any){
  return this.client.get(`${this.Base_url}deleterply/${id1}/${id2}`)
 }
 getuser(){
  return this.client.get(`${this.Base_url}user`)
 }
 home_images = [{
  image: "assets/sliders/food.jpg",
  title: "The Taste",
  content: "Laughter is brightest in the place where food is good."
},
{
  image: "assets/sliders/movie.jpg",
  title: "The Creatives",
  content: "The difference between life and movies is that a script has to make sense,and life doesn't."
},{
  image: "assets/sliders/travel.jpg",
  title: "The World",
  content: "Travel takes us out of our comfort zones and inspires us to see,taste and try new things."
},
{
  image: "assets/sliders/wildlife.jpg",
  title: "The Wild",
  content: "Wildlife is something which man cannot construct.Once it is gone,it is gone forever."
},
{
  image: "assets/sliders/game.jpg",
  title: "More Funs",
  content: "One day,some parents will understand that online games cannot be paused."
}]
}
