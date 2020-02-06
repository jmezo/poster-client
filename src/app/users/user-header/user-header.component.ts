import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Input() username: string;
  @Input() height: string= "50px";
  imageRef: string = 'https://images-na.ssl-images-amazon.com/images/I/513vjQ3OzFL._AC_SX522_.jpg';
  constructor() { }

  ngOnInit() { }

}
