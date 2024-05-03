import { Component, OnInit } from '@angular/core';
import { SplicePipe } from '../splice.pipe';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [SplicePipe,DatePipe],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit{
  constructor(private service: ApiService, private router: Router) { }
  message: string = ''

  all_Blogs: any
  blogs: any
  ngOnInit(): void {

    this.service.All_blogs.subscribe((Blogs) => {
      this.all_Blogs = Blogs
    })
    this.service.getBlogs().subscribe((data: any) => {
      //console.log(data);

      if (data == "No Blogs") {
        this.message = "no blogs are available"
      } else {
        this.blogs = data
        this.all_Blogs = this.blogs
        // console.log("all blogs",this.all_Blogs);
        this.service.updateBlogs(data)

      }

    })
  }

  filter_open="filter-open"
  filter=false
  select_filter(){ 
this.filter=!this.filter
  }


  active = "active"
  first = 0
  second = 0
  filteritem = [true, false, false, false, false, false, false, false, false]
  filterActive(filter: any, no: number) {
      this.second = no
      this.filteritem[this.first] = false
      this.filteritem[this.second] = true
      this.first = this.second
      this.second = 0
      if (filter!="All") {
        let allblogs:any[]=[]
        this.all_Blogs = this.blogs.forEach((blog:any) => {
        if (blog.category == filter) {
         allblogs.push(blog)
        } 

        })
        this.all_Blogs=allblogs
      } else {
        this.all_Blogs = this.blogs
      }
    console.log(this.all_Blogs);
    this.filter=!this.filter 
  }


  view(id: any) {
    console.log(id);
    this.router.navigateByUrl(`/blogview/${id}`)


  }
}
