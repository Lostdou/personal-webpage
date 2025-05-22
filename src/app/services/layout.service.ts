import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebarModeSubject = new BehaviorSubject<boolean>(false);
  sidebarMode$ = this.sidebarModeSubject.asObservable();
  
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.sidebarModeSubject.next(event.url.includes('/doublog'));
    });
  }

  setSidebarMode(active: boolean) {
    this.sidebarModeSubject.next(active);
  }

  toggleSidebarMode() {
    this.sidebarModeSubject.next(!this.sidebarModeSubject.value);
  }
}
