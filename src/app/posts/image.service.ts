import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class ImageService {

  constructor(private http: HttpClient) { }

  getPostImage(postId: number) {
    return this.getImageFromService('http://localhost:8080/posts/img/', postId);
  }

  getUserImage(username: string) {
    return this.getImageFromService('http://localhost:8080/users/img/', username);
  }

  private sendHttpRequest(url: string, pathId: number | string): Observable<Blob> {
    const urlWithPath: string = url + pathId;
    return this.http.get(urlWithPath, {responseType: 'blob'});
  }

  private getImageFromService(url: string, postId: number | string) {
    const imageSubject = new Subject<string | ArrayBuffer>();
    this.sendHttpRequest(url, postId).subscribe(data => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        imageSubject.next(reader.result);
      }, false);
      if (data) {
         reader.readAsDataURL(data);
      }
    }, error => {
      return;
    });
    return imageSubject;
  }

}
