import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(private service:ApiService,private router:Router){}

  clicked=false
  open="open"
  category_value='Movie'
  category(){
    this.clicked=!this.clicked
  }
  get_category(value:string){
    this.category_value=value
    this.clicked=false
    
  }
//displaying
myform={
  title:'',
  image:'',
  subtitle:'',
  content:''
}
formdata=new FormData()
onChange(event:any){
  this.formdata.delete("blg")
  const file=event.target.files[0]
  this.formdata.append("blg",file)
  const reader=new FileReader()
  reader.readAsDataURL(file)
  reader.onload=()=>{
  let image1:any=reader.result
  this.myform.image=image1
  }
}

onSubmit(){
  this.formdata.delete("title")
  this.formdata.delete("subtitle")
  this.formdata.delete("content")
  this.formdata.delete("category")
   console.log(this.myform);
   this.formdata.append("title",this.myform.title)
   this.formdata.append("subtitle",this.myform.subtitle)
   this.formdata.append("content",this.myform.content)
   this.formdata.append("category",this.category_value)
   this.service.postCreation(this.formdata).subscribe((data)=>{
    console.log(data);
    
   })
   window.location.reload()
   
  }
}
