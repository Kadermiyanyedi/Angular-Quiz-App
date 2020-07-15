import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { QuizComponent } from './components/quiz/quiz.component'
import { ResultComponent } from './components/result/result.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'question/:id', component: QuizComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
