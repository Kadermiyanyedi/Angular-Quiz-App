import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private _apiService: ApiService, private _route: ActivatedRoute, private _router: Router) {
    this.score = 0
  }

  ngOnInit(): void {
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
      console.log("Bitti")
      localStorage.setItem('score', this.score.toString())
      console.log("score", this.score)
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
        console.log(this.correctAnswer)

      } else {
        this._apiService.getQuestion()
        var data = JSON.parse(localStorage.getItem('questions'))
        this.q = data.results[this.index]
        this.correctAnswer = this.q.correct_answer

      }
    })

  }


}
