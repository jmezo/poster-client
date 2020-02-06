import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  imageToShow: any;
  isImageLoading: boolean = false;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    if (this.post.hasImage) {
      this.imageService.getPostImage(this.post.id).subscribe(image => this.imageToShow = image);
    }
  }
  
}
