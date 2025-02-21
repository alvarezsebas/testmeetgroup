// 📌 Clase encargada de procesar matrices de cualquier dimensión
export class ProcesarMatriz {
  // Propiedad privada para almacenar la matriz ingresada
  private matriz: number | number[][];

  // 🔹 Constructor que recibe la matriz y la almacena
  constructor(matriz: number | number[][]) {
    this.matriz = matriz;
  }

  // 🔹 Método getter que devuelve la profundidad máxima (dimensión) de la matriz
  get dimension(): number {
    /**
     * 📌 Función recursiva que busca la profundidad máxima de una matriz.
     * Si el elemento es un array, busca su profundidad y devuelve el máximo encontrado.
     * Si no es un array, devuelve la profundidad actual.
     */
    const buscarDimension = (arr: any, prof = 0): number =>
      Array.isArray(arr) 
        ? Math.max(...arr.map((sub) => buscarDimension(sub, prof + 1)), prof + 1) 
        : prof;

    // Retorna la profundidad calculada de la matriz
    return buscarDimension(this.matriz);
  }

  // 🔹 Método getter que verifica si la matriz es uniforme (todos los subarrays tienen la misma longitud)
  get straight(): boolean {
    /**
     * 📌 Función recursiva que revisa si todos los subarrays tienen la misma longitud.
     * - Si encuentra un subarray de diferente tamaño, retorna `false`.
     * - Si todos los subarrays tienen la misma longitud, retorna `true`.
     */
    const checkUniform = (arr: any): boolean => {
      // Si el elemento no es un array, no afecta la uniformidad (números individuales se aceptan)
      if (!Array.isArray(arr)) return true;

      // Se obtiene la longitud del primer subarray
      const firstLength = arr[0]?.length;

      // Se verifica que todos los subarrays tengan la misma longitud y que también sean uniformes
      return arr.every((sub) =>
        Array.isArray(sub) ? sub.length === firstLength && checkUniform(sub) : true
      );
    };

    // Retorna `true` si la matriz es uniforme, `false` en caso contrario
    return checkUniform(this.matriz);
  }

  // 🔹 Método getter que calcula la suma total de todos los valores en la matriz
  get compute(): number {
    /**
     * 📌 Función recursiva que suma todos los valores dentro de la matriz.
     * - Si el elemento es un array, llama a sí misma y acumula la suma.
     * - Si el elemento es un número, lo suma directamente.
     */
    const sumMatrix = (arr: any): number =>
      Array.isArray(arr) 
        ? arr.reduce((sum, sub) => sum + sumMatrix(sub), 0) 
        : arr;

    // Retorna el resultado de la suma total de los elementos en la matriz
    return sumMatrix(this.matriz);
  }
}
