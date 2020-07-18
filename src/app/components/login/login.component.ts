import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  selectedValue: string;
  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit(): void {
  }
  OnSubmit(name: string) {
    localStorage.setItem("difficulty", this.selectedValue)
    this._apiService.getQuestion(this.selectedValue);
    localStorage.setItem("username", name)
    this._router.navigate(['/question/0']);
  }
  onItemChange(value) {
    this.selectedValue = value
  }

}
