import { CommonModule } from '@angular/common';
import { Component, OnInit, numberAttribute } from '@angular/core';
import quizz__question from "../../../assets/data/quizz_question.json"

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title:string = ""

  questions : any
  questionSelected : any

  answers : string[] = []
  answerSelected : string = ""

  questionIndex : number = 0
  questionMaxIndex : number = 0

  finished : boolean = false



  constructor() {}



  ngOnInit(): void {
    if (quizz__question) {
      this.finished = false
      this.title = quizz__question.title

      this.questions = quizz__question.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length


    }
  }

  playerChoose(value:string) {
    this.nextStep()
   this.answers.push(value)

  }

   async nextStep () {
    this.questionIndex +=1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected  = quizz__question.results[finalAnswer as keyof typeof quizz__question.results]
    }
  }

  async checkResult (answers:string[]) {

    const result = answers.reduce((previus, current, i, arr) =>{
      if (arr.filter(item => item === previus).length > arr.filter(item => item === current).length) {
        return previus
      } else {
        return current
      }
    })
    return result
  }

}
