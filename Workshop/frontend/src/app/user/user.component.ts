import { Component } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private servis: UserService){}
  korisnickoIme: string;
  ngOnInit():void{
    this.korisnickoIme=localStorage.getItem("korisnickoIme")
  }
}
