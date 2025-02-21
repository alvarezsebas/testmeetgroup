import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  tiendas: { nombre: string, productos: string[] }[] = [];
  tiendaSeleccionada: number = 0;
  nuevaTienda: string = '';
  nuevoProducto: string = '';

  agregarTienda() {
    if (this.nuevaTienda.trim()) {
      this.tiendas.push({ nombre: this.nuevaTienda, productos: [] });
      this.nuevaTienda = '';
      this.tiendaSeleccionada = this.tiendas.length - 1;
    }
  }

  eliminarTienda(index: number) {
    this.tiendas.splice(index, 1);
    this.tiendaSeleccionada = this.tiendas.length > 0 ? 0 : -1;
  }

  seleccionarTienda(index: number) {
    this.tiendaSeleccionada = index;
  }

  agregarProducto() {
    if (this.nuevoProducto.trim() && this.tiendaSeleccionada >= 0) {
      this.tiendas[this.tiendaSeleccionada].productos.push(this.nuevoProducto);
      this.nuevoProducto = '';
    }
  }

  eliminarProducto(index: number) {
    if (this.tiendaSeleccionada >= 0) {
      this.tiendas[this.tiendaSeleccionada].productos.splice(index, 1);
    }
  }
}