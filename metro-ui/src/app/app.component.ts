import { Component, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { AgGridAngular } from "ag-grid-angular";
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  NumberEditorModule,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
  RowSelectionOptions,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
  CsvExportModule,
  createGrid,
} from "ag-grid-community";
import { LoaderService } from './_services/loader.service';
ModuleRegistry.registerModules([
  NumberEditorModule,
  TextEditorModule,
  TextFilterModule,
  NumberFilterModule,
  RowSelectionModule,
  PaginationModule,
  CsvExportModule,
  ClientSideRowModelModule,
  ValidationModule,
]);

const SESSION_TIMEOUT_MS = 10 * 60 * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'metro-app';
  isSidebarOpen = false;
  loading = false;
  showUserDropdown = false;
  loggedInUser = 'Admin User';

  expandedMenus: { [key: string]: boolean } = { dashboard: false, settings: false };
  activeMenu: string = 'home';

  private sessionTimer: any;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSubMenu(menu: string) {
    this.expandedMenus[menu] = !this.expandedMenus[menu];
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  logout() {
    this.showUserDropdown = false;
    this.clearSessionTimer();
    if (this.isBrowser) {
      localStorage.removeItem('sidebarState');
      localStorage.removeItem('loginUser');
    }
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-info')) {
      this.showUserDropdown = false;
    }
  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  resetSessionTimer() {
    if (this.isBrowser && !this.isLoginPage()) {
      this.clearSessionTimer();
      this.ngZone.runOutsideAngular(() => {
        this.sessionTimer = setTimeout(() => {
          this.ngZone.run(() => {
            alert('Your session has expired due to inactivity. You will be redirected to the login page.');
            this.logout();
          });
        }, SESSION_TIMEOUT_MS);
      });
    }
  }

  private clearSessionTimer() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  ngOnInit() {
    this.loaderService.isLoading$.subscribe(isLoading => {
      setTimeout(() => {
        this.loading = isLoading;
        this.cdRef.detectChanges();
      });
    });

    if (this.isBrowser) {
      const savedUser = localStorage.getItem('loginUser');
      if (savedUser) {
        this.loggedInUser = savedUser;
      }
      this.resetSessionTimer();
    }
  }

  ngOnDestroy() {
    this.clearSessionTimer();
  }
}
