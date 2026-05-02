import { Component, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
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
  ValidationModule /* Development Only */,
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'metro-app';
  isSidebarOpen = false;
  loading = false;

  expandedMenus: { [key: string]: boolean } = { dashboard: false, settings: false };
  activeMenu: string = 'home';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any, private loaderService: LoaderService, private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Window width:', window.innerWidth); // ✅ Safe in SSR
    }
    //this.loaderService.isLoading$.subscribe(isLoading => this.loading = isLoading);
    //this.loaderService.isLoading$.subscribe(isLoading => {
    //  this.loading = isLoading;
    //  this.cdRef.detectChanges(); // Force Angular to detect changes
    //});
    //this.loaderService.isLoading$.subscribe(isLoading => {
    //  this.ngZone.run(() => {
    //    this.loading = isLoading; // Update loading state inside NgZone.run()
    //    this.cdRef.detectChanges(); // Ensure change detection is triggered
    //  });
    //});    
  }

  isLoginPage(): boolean {
    return this.router.url === '/login'; // Hide layout when on login page
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSubMenu(menu: string) {
    this.expandedMenus[menu] = !this.expandedMenus[menu]; // ✅ Use bracket notation
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }
  ngOnInit() {
    this.loaderService.isLoading$.subscribe(isLoading => {
      setTimeout(() => {
        this.loading = isLoading;
        this.cdRef.detectChanges(); // Trigger change detection after the state change
      });
    });
  }
}
