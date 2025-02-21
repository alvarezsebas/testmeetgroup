import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [ SidebarComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
constructor(private authService: AuthService) {}

isLoggedIn(): boolean {
  // Llama al método isLoggedIn() del servicio AuthService
  // para verificar si el usuario está autenticado.
  return this.authService.isLoggedIn();
}

}
