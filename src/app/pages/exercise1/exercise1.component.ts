import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Importa FormsModule
import { ProcesarMatriz } from '../../helpers/matriz';

@Component({
  selector: 'app-exercise1',
  imports: [FormsModule, CommonModule],
  templateUrl: './exercise1.component.html',
  styleUrl: './exercise1.component.css'
})
export class Exercise1Component {
  inputText: string = '';
  matrix: any = null;
  result: { dimension: number; straight: boolean; compute: number } | null = null;

  processMatrix() {
    try {
      this.matrix = JSON.parse(this.inputText);
      const myMatrix = new ProcesarMatriz(this.matrix); // ✅ Crea una instancia de MyMatrix

      this.result = {
        dimension: myMatrix.dimension,
        straight: myMatrix.straight,
        compute: myMatrix.compute,
      };
    } catch (error) {
      this.result = null;
      console.error('Error en el formato de la matriz:', error);
    }
  }
}
