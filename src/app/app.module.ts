import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialImportsModule } from './material-imports.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { UserHeaderComponent } from './users/user-header/user-header.component';
import { CommentComponent } from './posts/comment/comment.component';
import { DetailedPostComponent } from './posts/detailed-post/detailed-post.component';
import { PostFooterComponent } from './posts/post-footer/post-footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostListItemComponent } from './posts/post-list-item/post-list-item.component';
import { SignupComponent } from './signup/signup.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ToolbarComponent,
    PostListComponent,
    PostComponent,
    CreatePostComponent,
    HomeComponent,
    UserHeaderComponent,
    CommentComponent,
    DetailedPostComponent,
    PostFooterComponent,
    PageNotFoundComponent,
    PostListItemComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MaterialImportsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [
    DetailedPostComponent
  ]
})
export class AppModule { }
