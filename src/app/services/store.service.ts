import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = 'http://localhost:3000/api/store'; // Reemplaza con tu endpoint real

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // O donde guardes el token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Obtener todas las tiendas
  getTiendas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Agregar una nueva tienda
  addTienda(nombre: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nombre }, { headers: this.getHeaders() });
  }

  // Eliminar una tienda por ID
  deleteTienda(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Agregar un producto a una tienda
  addProducto(id: string, producto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/items/${id}`, { producto }, { headers: this.getHeaders() });
  }

  // Actualizar los items
  actualizarProducto(tiendaId: string, productoId: string, productoActualizado: any) {
    return this.http.put(`${this.apiUrl}/${tiendaId}/item/${productoId}`, productoActualizado, { headers: this.getHeaders() });
  }

  // Eliminar un producto de una tienda
  deleteProducto(id: string, producto: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/item/${producto}`, { headers: this.getHeaders() });
  }
}
