import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private getUrl = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
  constructor(private _http: HttpClient) { }

  getQuestion(difficulty: string) {
    var getUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=' + difficulty + '&type=multiple'
    return this._http.get(getUrl).subscribe(data => {
      for (var i = 0; i < data['results'].length; i++) {
        var random = Math.floor(Math.random() * 3)
        var correctAnswer = data['results'][i].correct_answer;

        //We put the correct answer in a random index
        var tmp = data['results'][i]['incorrect_answers'][random]
        data['results'][i]['incorrect_answers'][random] = correctAnswer
        data['results'][i]['incorrect_answers'].push(tmp)
        localStorage.setItem('questions', JSON.stringify(data))
        localStorage.setItem('len', data['results'].length)

        // console.log(data['results'][this.index])
        // console.log(data['results'].length)
      }

    },
      err => console.error(err)
    )
  }
}
