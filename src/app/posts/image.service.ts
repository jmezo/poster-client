import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class ImageService {

  constructor(private http: HttpClient) { }

  getPostImage(postId: number) {
    return this.getImageFromService('http://localhost:8080/posts/img/', postId);
  }

  private sendHttpRequest(url: string, pathId: number): Observable<Blob> {
    const urlWithPath: string = url + pathId;
    return this.http.get(urlWithPath, {responseType: 'blob'});
  }

  private getImageFromService(url: string, postId: number) {
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
      console.log(error);
    });
    return imageSubject;
  }

}
