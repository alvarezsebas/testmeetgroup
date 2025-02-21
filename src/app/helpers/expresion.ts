// 📌 Clase encargada de procesar una expresión matemática
export class ProcesarExpresion {
    // Propiedad privada que almacena la expresión matemática ingresada
    private expression: string;
  
    // 🔹 Constructor que recibe una expresión y la almacena después de eliminar espacios innecesarios
    constructor(expression: string) {
      this.expression = expression.trim(); // Se eliminan espacios en los extremos
    }
  
    // 🔹 Getter que verifica si la expresión es una operación aritmética válida
    get operation(): boolean {
      /**
       * 📌 Expresión regular para validar operaciones aritméticas:
       * - Permite números (`\d`)
       * - Espacios en blanco (`\s`)
       * - Paréntesis `()`
       * - Operadores matemáticos `+ - * /`
       * - Punto `.` para decimales
       * - El `^` indica el inicio y el `$` el final de la cadena
       */
      const expregular = /^[\d\s()+\-*/.]+$/;
  
      // Verifica si la expresión cumple con el patrón y si los paréntesis están bien balanceados
      return expregular.test(this.expression) && this.validParentheses();
    }
  
    // 🔹 Getter que evalúa la expresión matemática si es válida y devuelve el resultado
    get calculo(): number | false {
      // Si la expresión no es válida, retorna `false`
      if (!this.operation) return false;
  
      try {
        /**
         * 📌 Se usa `new Function()` para evaluar la expresión matemática:
         * - `return ${this.expression};` genera una función que evalúa la expresión
         * - Se ejecuta con `()`
         * - En caso de error (ejemplo: división por cero, error de sintaxis), se captura en el bloque `catch`
         */
        return new Function(`return ${this.expression};`)();
      } catch (error) {
        // Si la evaluación falla, retorna `false`
        return false;
      }
    }
  
    // 🔹 Método privado para verificar si los paréntesis están bien balanceados en la expresión
    private validParentheses(): boolean {
      let balance = 0; // Variable para llevar el conteo de paréntesis abiertos y cerrados
  
      // Recorre cada carácter de la expresión
      for (const char of this.expression) {
        if (char === '(') balance++; // Si es un paréntesis abierto, aumenta el balance
        if (char === ')') balance--; // Si es un paréntesis cerrado, disminuye el balance
  
        if (balance < 0) return false; // Si en algún momento hay más `)` que `(`, la expresión es inválida
      }
  
      return balance === 0; // Retorna `true` si los paréntesis están bien balanceados, `false` si no
    }
  }
  
  