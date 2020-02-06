import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from '../post.service';
import { MatExpansionPanel } from '@angular/material/expansion';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  username: string;
  postText: string;
  selectedImage: ImageSnippet;
  @ViewChild('panel', {static: true}) panel: MatExpansionPanel;

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.username = this.authService.user.getValue().username;
  }

  onSelectImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedImage = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  onRemoveImage() {
    this.selectedImage = null;
  }

  onSubmit() {
    this.postService.createPost(this.createFormData()).subscribe(
      res => {
        this.postService.fetchPosts();
        this.clearCreatePost();
      },
      err => console.log(err)
    )
  }

  private clearCreatePost() {
    this.postText = null;
    this.selectedImage = null;
    this.panel.close();
  }

  private createFormData(): FormData {
    if (!this.selectedImage && !this.postText) {
      return null;
    }
    const formData = new FormData();
    formData.append('username', this.username);
    if (this.postText) {
      formData.append('text', this.postText);
    }
    if (this.selectedImage) {
      formData.append('image', this.selectedImage.file);
    }
    return formData;
  }

}
