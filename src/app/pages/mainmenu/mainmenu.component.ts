import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../public/navbar/navbar.component';
import { CodeSectionComponent } from '../code-section/code-section.component';
import { CommonModule } from '@angular/common';
import { GameSectionComponent } from '../game-section/game-section.component';
import { LayoutService } from '../../services/layout.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [NavbarComponent, CommonModule, CodeSectionComponent, GameSectionComponent, RouterLink],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.css',
  animations: [
    trigger('sidebarAnimation', [
      state('normal', style({
        width: '100%',
        transform: 'translateX(0)'
      })),
      state('sidebar', style({
        width: '300px',
        transform: 'translateX(0)'
      })),
      transition('normal <=> sidebar', animate('0.5s ease-in-out'))
    ]),
    trigger('contentAnimation', [
      state('normal', style({
        marginLeft: '0',
        width: '100%'
      })),
      state('sidebar', style({
        marginLeft: '300px',
        width: 'calc(100% - 300px)'
      })),
      transition('normal <=> sidebar', animate('0.5s ease-in-out'))
    ])
  ]
})
export class MainmenuComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  private timerInterval: any;
  selectedSection: string = 'code-section';
  isSidebarMode = false;
  private subscription: Subscription = new Subscription();

  constructor(private layoutService: LayoutService, private router: Router) {}

  ngOnInit() {
    this.updateTime();
    this.timerInterval = setInterval(() => {
      this.updateTime();
    }, 1000);

    this.subscription = this.layoutService.sidebarMode$.subscribe(mode => {
      this.isSidebarMode = mode;
    });
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.subscription.unsubscribe();
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

  navigateToBlog() {
    this.router.navigate(['/doublog']);
  }
}
