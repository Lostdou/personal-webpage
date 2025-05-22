import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NavbarComponent } from '../../public/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MainmenuComponent } from '../mainmenu/mainmenu.component';
import { LayoutService } from '../../services/layout.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MainmenuComponent, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isMobileView: boolean = false;

  constructor(private layoutService: LayoutService) {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobileView = window.innerWidth < 768;
  }

  ngOnInit() {
    this.layoutService.setSidebarMode(true);
  }

  ngOnDestroy() {
    this.layoutService.setSidebarMode(false);
    this.subscription.unsubscribe();
  }
}
