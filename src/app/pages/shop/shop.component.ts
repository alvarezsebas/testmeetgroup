import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/store.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  tiendas: { _id: string, name: string, items: { _id: string, name: string, price: number }[] }[] = [];
  tiendaSeleccionada: number = -1;
  nuevaTienda: string = '';
  nuevoProducto: { name: string, price: number } = { name: '', price: 0 };
  productoEditando: number | null = null; // Índice del producto en edición


  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.loadTiendas();
  }

  loadTiendas() {
    this.shopService.getTiendas().subscribe((data: any) => {
      this.tiendas = data.stores.map((tienda: { items: any; }) => ({
        ...tienda,
        items: tienda.items || [] // Asegurar que siempre sea un array
      }));
      
      if (this.tiendas.length > 0) {
        this.tiendaSeleccionada = 0;
      }
    });
  }
  

  agregarTienda() {
    if (this.nuevaTienda.trim()) {
      this.shopService.addTienda(this.nuevaTienda).subscribe((nuevaTienda) => {
        this.nuevaTienda = '';
        this.tiendaSeleccionada = this.tiendas.length - 1;
        this.loadTiendas();
      });
    }
  }

  eliminarTienda(index: number) {
    const id = this.tiendas[index]._id;
    this.shopService.deleteTienda(id).subscribe(() => {
      this.loadTiendas(); // Se recarga la lista en lugar de modificar localmente.
    });
  }

  seleccionarTienda(index: number) {
    if (index >= 0 && index < this.tiendas.length) {
      this.tiendaSeleccionada = index;
    }
  }

  agregarProducto() {
    if (this.nuevoProducto.name.trim() && this.nuevoProducto.price > 0 && this.tiendaSeleccionada >= 0) {
      const tienda = this.tiendas[this.tiendaSeleccionada];
      this.shopService.addProducto(tienda._id, this.nuevoProducto).subscribe(() => {
        this.nuevoProducto = { name: '', price: 0 };
        this.loadTiendas(); // Se recarga para obtener los datos actualizados.
      });
    }
  }

  eliminarProducto(index: number) {
    if (this.tiendaSeleccionada >= 0) {
      const tienda = this.tiendas[this.tiendaSeleccionada];
      const producto = tienda.items[index];

      this.shopService.deleteProducto(tienda._id, producto._id).subscribe(() => {
        this.loadTiendas(); // Se recarga para obtener los datos actualizados.
      });
    }
  }

  editarProducto(index: number) {
    this.productoEditando = index; // Habilita el modo edición
  }

  actualizarProducto(index: number) {
    const tienda = this.tiendas[this.tiendaSeleccionada];
    const producto = tienda.items[index];

    this.shopService.actualizarProducto(tienda._id, producto._id, producto)
      .subscribe({
        next: (respuesta) => {
          console.log("Producto actualizado en la API:", respuesta);
          this.loadTiendas();
          this.productoEditando = null;
        },
        error: (error) => {
          console.error("Error al actualizar el producto:", error);
        }
      });
  }
}