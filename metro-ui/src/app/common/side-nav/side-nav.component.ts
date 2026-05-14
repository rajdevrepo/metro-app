import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }
  isSidebarExpanded: boolean = false;
  currentUrl: string = '';
  menuItems = [
    {
      title: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      route: '/dashboard',
      collapsible: false,
      expanded: false,
      submenu: []
    },
    {
      title: 'Request Management',
      icon: 'fas fa-clipboard-list',
      expanded: false,
      route: '',
      collapsible: true,
      submenu: [
        { title: 'New Request', icon: 'fas fa-plus-circle', route: '/add-new' },
        { title: 'Pending Approval', icon: 'fas fa-hourglass-half', route: '/pending-approval' },
        { title: 'Approved List', icon: 'fas fa-check-circle', route: '/approved-list' }
      ]
    },
    {
      title: 'Work Completion',
      icon: 'fas fa-tasks',
      route: '/work-completion',
      collapsible: false,
      expanded: false,
      submenu: []
    },
    {
      title: 'Settings',
      icon: 'fas fa-cog',
      expanded: false,
      collapsible: true,
      route: '',
      submenu: [
        { title: 'Profile', icon: 'fas fa-user', route: '/settings/profile' },
        { title: 'Preferences', icon: 'fas fa-sliders-h', route: '/settings/preferences' }
      ]
    }
  ];


  ngOnInit() {
    this.currentUrl = this.router.url;
    this.expandActiveParent();

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
      this.expandActiveParent();
    });

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('sidebarState')) { localStorage.removeItem('sidebarState'); }
      this.loadMenuState();
    }
  }

  isMenuActive(item: any): boolean {
    if (item.route && !item.collapsible) {
      return this.currentUrl === item.route;
    }
    if (item.submenu && item.submenu.length > 0) {
      return item.submenu.some((sub: any) => this.currentUrl === sub.route);
    }
    return false;
  }

  isSubMenuActive(sub: any): boolean {
    return this.currentUrl === sub.route;
  }

  private expandActiveParent() {
    for (const item of this.menuItems) {
      if (item.collapsible && item.submenu.some((sub: any) => this.currentUrl === sub.route)) {
        item.expanded = true;
      }
    }
  }
  toggleSubMenu(item: any) {
    item.expanded = !item.expanded;
    this.saveMenuState();
  }
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
  saveMenuState() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sidebarState', JSON.stringify(this.menuItems));
    }
  }

  loadMenuState() {
    if (isPlatformBrowser(this.platformId)) {
      const savedState = localStorage.getItem('sidebarState');
      if (savedState) {
        //this.menuItems = JSON.parse(savedState);
      }
    }
  }
}
