import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/posts/image.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Input() username: string;
  @Input() height: string= "50px";
  imageRef: any = 'https://images-na.ssl-images-amazon.com/images/I/513vjQ3OzFL._AC_SX522_.jpg';
  constructor(private userService: UserService, private imageService: ImageService) { }

  ngOnInit() {
    this.userService.checkHasImage(this.username).subscribe(hasImage => {
      if (hasImage) {
        this.imageService.getUserImage(this.username).subscribe( image => {
          this.imageRef = image;
        });
      }
    });
  }

}
