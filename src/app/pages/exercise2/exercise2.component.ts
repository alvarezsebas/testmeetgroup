import { Component } from '@angular/core';
import { ProcesarExpresion } from '../../helpers/expresion';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise2',
  imports: [FormsModule, CommonModule],
  templateUrl: './exercise2.component.html',
  styleUrl: './exercise2.component.css'
})
export class Exercise2Component {
  inputExpression: string = '';
  result: number | false = false;
  isValidOperation: boolean = false;

  processExpression(): void {
    const validarExpresion = new ProcesarExpresion(this.inputExpression);
    this.isValidOperation = validarExpresion.operation;
    this.result = validarExpresion.calculo;
  }
}
