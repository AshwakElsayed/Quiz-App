/// <reference types="../@types/jquery" />
import { Quiz } from "./quiz.module.js";
export class Setting {
    constructor(){
        document.getElementById('start').addEventListener('click' , () =>  {
            this.startQuestion(); 
          })
    }
    async startQuestion(){
       const category = document.getElementById('category').value;
       const difficulty=document.querySelector('[name="difficulty"]:checked').value;
       const NumberOfQuestions =document.getElementById('amount').value;
       if (NumberOfQuestions > 0) {
        const result =await this.getQuestion(NumberOfQuestions,category,difficulty);
        $('#setting').removeClass('show');
        $('#quiz').addClass('show');
        const quiz =new Quiz(result);
        // console.log(result);
       } else {
        $('#alertNumber').fadeIn(1000);
       }
       
    }
    async getQuestion(amount,category,difficulty){
       const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`);
       const  response =await apiResponse.json();
       return response.results;
    }
}
