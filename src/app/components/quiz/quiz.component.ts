import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  q: any;
  correctAnswer: any;
  qlen: number;
  index: number;
  score: number;
  sub;
  progressbarValue = 100;
  curSec: number = 0;
  difficulty: string;
  constructor(private _apiService: ApiService, private _route: ActivatedRoute, private _router: Router) {
    this.score = 0
    this.startTimer(60)
  }

  ngOnInit(): void {
    this.difficulty = localStorage.getItem("difficulty")
    this.getQuestion();
    this.qlen = +localStorage.getItem('len')
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  VerifyAnswer(answer, e) {
    if (answer === this.correctAnswer) {
      this.score = this.score + 10
    }
    if (this.index == this.qlen - 1) {
      // when the last Question 
      localStorage.setItem('score', this.score.toString())
      this._router.navigate(['/result']);


    } else {
      // navigate to next Question
      this._router.navigate(['question/' + (this.index + 1)]);
    }
  }
  getQuestion() {
    this.sub = this._route.params.subscribe(params => {
      // (+) converts string 'id' to a number
      // fetch the file and get next Question
      this.index = +params['id'];

      if (localStorage.getItem('q') !== null) {
        var data = JSON.parse(localStorage.getItem('questions'))
        this.q = data.results[this.index]
        this.correctAnswer = this.q.correct_answer

      } else {
        this._apiService.getQuestion(this.difficulty)
        var data = JSON.parse(localStorage.getItem('questions'))
        this.q = data.results[this.index]
        localStorage.setItem("q", this.q)
        this.correctAnswer = this.q.correct_answer

      }
    })

  }
  startTimer(seconds: number) {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 100 - sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        this._router.navigate(['/result']);
        sub.unsubscribe();
      }
    });
  }
}

