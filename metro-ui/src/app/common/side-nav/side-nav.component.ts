import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  isSidebarExpanded: boolean = false; // Add this line
  menuItems = [
    {
      title: 'Dashboard',
      icon: 'fas fa-area-chart',
      route: '/dashboard',
      collapsible: false,
      expanded: false,
      submenu: []
    },
    {
      title: 'Request Management',
      icon: 'fas fa-list-check',
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
    if (localStorage.getItem('sidebarState')) { localStorage.removeItem('sidebarState'); }
    if (isPlatformBrowser(this.platformId)) {
      this.loadMenuState();
    }
  }
  toggleSubMenu(item: any) {
    item.expanded = !item.expanded;
    this.saveMenuState();
  }
  toggleSidebar() { // Add this function
    this.isSidebarExpanded = !this.isSidebarExpanded;

  }
  saveMenuState() {
    localStorage.setItem('sidebarState', JSON.stringify(this.menuItems));
  }

  loadMenuState() {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState) {
      //this.menuItems = JSON.parse(savedState);
    }
  }
}
