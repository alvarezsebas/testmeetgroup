import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout(); // Llama al método de logout del servicio de autenticación
    this.router.navigate(['/login']); // Redirige al usuario a la pantalla de login
  }
}
