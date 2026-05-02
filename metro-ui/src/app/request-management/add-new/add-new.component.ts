import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UnSub } from '../../../common/unsub';
import { AppManagementService } from '../../_services/app-management.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../../common/custom-modal/custom-modal.component';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss'
})
export class AddNewComponent extends UnSub implements OnInit {
  constructor(private appService: AppManagementService, private fb: FormBuilder, private dialog: MatDialog) {
  super();
  }
  stationlist: any[] = [];
  newrequestForm: FormGroup = new FormGroup({});
  isformValid = false;

  ngOnInit() {
    this.getstationlist();
    this.initializeForm();
  }
  initializeForm() {
    this.newrequestForm = this.fb.group({
      StattionName: ['', [Validators.required]],
      WorkDate: ['', [Validators.required]],
      EmployeeName: ['', [Validators.required]],
      EmployeeCode: ['', [Validators.required]],
      Designation: [''],
      Department: ['', [Validators.required]],
      RequiredPermission: ['', [Validators.required]],
      HoursFrom: ['', [Validators.required]],
      HoursTo: ['', [Validators.required]],
      NooOfCMRLStaff: ['', [Validators.required]],
      NooOfContratStaff: ['', [Validators.required]],
      ContactNo: [''],
      CreatedBy: ['rajmalar21@gmail.com']
    })
  }
  public fnvalidate(boolean: any) {
    return boolean;
  }
  getstationlist() {
    let model = {};
    this.appService.getstationlist(model).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.stationlist = data;
      })
  }
  formSubmit() {
    if (!this.newrequestForm.valid) {
      this.isformValid = true;
      return;
    }
    this.appService.insert_newrequest(this.newrequestForm.value).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.stationlist = data;
        
        this.dialog.open(CustomModalComponent, {
          width: '400px',
          panelClass: 'custom-dialog-container', // Optional for further styling
          data: { title: 'Application Submitted Successfully', message: `Your Application ID : ${data[0].ApplicationID}.` }
        });
        this.initializeForm();
        this.getstationlist();
      });
  }
}
