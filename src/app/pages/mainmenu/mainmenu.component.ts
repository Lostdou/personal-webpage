import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../public/navbar/navbar.component';
import { CodeSectionComponent } from '../code-section/code-section.component';
import { CommonModule } from '@angular/common';
import { GameSectionComponent } from '../game-section/game-section.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [NavbarComponent, CommonModule, CodeSectionComponent, GameSectionComponent],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.css'
})
export class MainmenuComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  private timerInterval: any;
  selectedSection: string = 'code-section';

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateTime();
    this.timerInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
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
