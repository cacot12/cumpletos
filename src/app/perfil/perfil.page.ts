import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { addIcons } from 'ionicons';
import { storefrontOutline, happyOutline, cartOutline, fastFoodOutline, menuOutline } from 'ionicons/icons';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]  // Asegúrate de incluir FormsModule aquí
})
export class PerfilPage implements OnInit {
  profileImage: string | ArrayBuffer | null = null;
  puntosAcumulados: number = 0;
  nombreUsuario: string = '';
  correoElectronico: string = '';
  direccion: string = ''; // Nueva propiedad para la dirección
  isLoggedIn = false;
  email: string = '';
  password: string = '';

  constructor(
    private auth: Auth,
    private alertController: AlertController
  ) {
    addIcons({ storefrontOutline, cartOutline, happyOutline, menuOutline, fastFoodOutline });
    
    // Modificar la verificación del estado de autenticación
    this.auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.correoElectronico = user.email || '';
        this.cargarDatosUsuario();
      }
    });
  }

  ngOnInit() {
    this.cargarPuntos();
    this.cargarDatosUsuario();
    this.cargarDireccion(); // Carga la dirección al iniciar el componente
  }

  cargarPuntos() {
    const puntos = localStorage.getItem('puntosAcumulados');
    this.puntosAcumulados = puntos ? parseFloat(puntos) : 0;
  }

  cargarDatosUsuario() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.correoElectronico = localStorage.getItem('correoElectronico') || '';
  }

  cargarDireccion() {
    this.direccion = localStorage.getItem('direccion') || ''; // Carga la dirección del localStorage
  }

  guardarNombreUsuario() {
    localStorage.setItem('nombreUsuario', this.nombreUsuario);
  }

  guardarCorreoElectronico() {
    localStorage.setItem('correoElectronico', this.correoElectronico);
  }

  guardarDireccion() {
    localStorage.setItem('direccion', this.direccion); // Guarda la dirección en el localStorage
  }

  selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.isLoggedIn = true;
      this.limpiarCampos();
    } catch (error) {
      this.mostrarError('Error al iniciar sesión', 'Credenciales inválidas');
    }
  }

  async register() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.isLoggedIn = true;
      this.limpiarCampos();
    } catch (error) {
      this.mostrarError('Error al registrarse', 'No se pudo crear la cuenta');
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.isLoggedIn = false;
    } catch (error) {
      this.mostrarError('Error', 'No se pudo cerrar sesión');
    }
  }

  private limpiarCampos() {
    this.email = '';
    this.password = '';
  }

  private async mostrarError(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
