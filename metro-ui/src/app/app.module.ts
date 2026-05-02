import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'; 

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion'; // For collapsible submenus
import { MatDialogModule } from '@angular/material/dialog';

import { AgGridModule } from 'ag-grid-angular';

import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//loader interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './_services/interceptor.service';

import { RequestApprovalComponent } from './request-management/request-approval/request-approval.component';
import { AddNewComponent } from './request-management/add-new/add-new.component';
import { PendingApprovalComponent } from './request-management/pending-approval/pending-approval.component';
import { LoaderComponent } from './common/loader/loader.component';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ApprovedListComponent } from './request-management/approved-list/approved-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'add-new', component: AddNewComponent },
  { path: 'pending-approval', component: PendingApprovalComponent },
  { path: 'request-approval/:id', component: RequestApprovalComponent },
  { path: 'sidenav', component: SideNavComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'approved-list', component: ApprovedListComponent },
  { path: '**', redirectTo: 'login' } // Redirect invalid URLs to login
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddNewComponent,
    PendingApprovalComponent,
    RequestApprovalComponent,
    LoaderComponent,
    SideNavComponent,
    DashboardComponent,
    ApprovedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatePipe,

    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,

    AgGridModule,

    MdbRippleModule,
    MdbFormsModule,
    MdbDropdownModule,
    MdbRadioModule,
    MdbValidationModule,

    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
