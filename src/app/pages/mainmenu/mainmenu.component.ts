import { Component } from '@angular/core';
import { NavbarComponent } from '../../public/navbar/navbar.component';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.css',
})
export class MainmenuComponent {
  currentTime: string = '';
  private timerInterval: any;

  ngOnInit() {
    this.updateTime();
    this.timerInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  private updateTime() {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    };
    this.currentTime = new Date().toLocaleString('es-AR', options);
  }
}
