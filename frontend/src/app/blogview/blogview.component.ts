import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-blogview',
  standalone: true,
  imports: [FormsModule,DatePipe],
  templateUrl: './blogview.component.html',
  styleUrl: './blogview.component.css'
})
export class BlogviewComponent implements OnInit{
  constructor(private Aroute:ActivatedRoute,private service:ApiService, private router:Router){}
  id:any
  blog_view:any
    ngOnInit(): void {
      this.id=this.Aroute.snapshot.params['id']
       this.service.getBlogView(this.id).subscribe((data:any)=>{
        this.comment_length=data.blog.comments.length
        this.like_length=data.blog.liked_Users.length
        this.liked=data.status
        this.blog_view=data.blog
      })
     
  
    }
  comment_length=0
  like_length=0
  comment=''
  replay=''
  liked:any
  addComment(bid:any){
    let addcmnt={Comment:this.comment}
    console.log("blog:",bid,"cid:",addcmnt.Comment);
    this.service.postComment(bid,addcmnt).subscribe((data)=>{
      console.log(data);
      
    })
    window.location.reload()
  }
  
  addReplay(id:any,rply:any){
    let addrply={
      Replay:rply
    }
    //console.log( "cid",id, "rply:",rply);
    this.service.postReplay(id,addrply).subscribe((data)=>{
      console.log(data);
      
    })
   window.location.reload()
  }
  
  addLike(id:any){
    this.service.postLike(id).subscribe((data)=>{
      console.log(data);
      
    })
    window.location.reload()
  }
  deletereplay(cid:any,rid:any){
  this.service.getdeleterply(cid,rid).subscribe((data)=>{
    console.log(data);
    
  })
  window.location.reload()
  }
  deletecomment(cid:any){
  this.service.getdeletecmnt(this.blog_view._id,cid).subscribe((data)=>{
    console.log(data);
    
  })
  window.location.reload()
  }
  
}
