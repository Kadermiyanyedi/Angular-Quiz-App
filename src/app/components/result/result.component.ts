import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score: string;
  name: string;
  constructor() { }

  ngOnInit(): void {

    this.score = localStorage.getItem('score')
    this.name = localStorage.getItem('username')
  }

}
