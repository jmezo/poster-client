import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/posts/image.service';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Input() username: string;
  @Input() height: string= "50px";
  imageRef: any = 'https://images-na.ssl-images-amazon.com/images/I/513vjQ3OzFL._AC_SX522_.jpg';
  @Input() enableFollow: boolean = true;
  isCurrentUser: boolean;
  isFollowing: boolean = false;

  constructor(private userService: UserService, private imageService: ImageService, private authservice: AuthService) { }

  ngOnInit() {
    this.isCurrentUser = this.authservice.user.getValue().username == this.username;
    this.userService.checkHasImage(this.username).subscribe(hasImage => {
      if (hasImage) {
        this.imageService.getUserImage(this.username).subscribe( image => {
          this.imageRef = image;
        });
      }
    });
  }

  onClickFollow() {
    this.isFollowing = !this.isFollowing;
  }
}
