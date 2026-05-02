import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppManagementService } from '../../_services/app-management.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { UnSub } from '../../../common/unsub';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../../common/custom-modal/custom-modal.component';

@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrl: './request-approval.component.scss'
})
export class RequestApprovalComponent extends UnSub implements OnInit {
  constructor(private route: ActivatedRoute, private appService: AppManagementService, private fb: FormBuilder, private dialog: MatDialog) {
    super();
  }

  stationlist: any[] = [];
  requestdata: any[] = [];
  id!: number;
  remarks_required = false;
  newrequestForm: FormGroup = new FormGroup({});
  isformValid = false;
  ngOnInit() {
    this.getstationlist();   
    this.initializeForm();

    if (this.route.snapshot.paramMap.get('id')) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.getrequestapplndetl(this.id);
    }
  }
  initializeForm() {
    this.remarks_required = false;
    this.newrequestForm = this.fb.group({
      Id:[0],
      StattionName: [{ value: '', disabled: true }, [Validators.required]],
      WorkDate: [{ value: '', disabled: true }, [Validators.required]],
      EmployeeName: [{ value: '', disabled: true }, [Validators.required]],
      EmployeeCode: [{ value: '', disabled: true }, [Validators.required]],
      Designation: [{ value: '', disabled: true }],
      Department: [{ value: '', disabled: true }, [Validators.required]],
      RequiredPermission: [{ value: '', disabled: true }, [Validators.required]],
      HoursFrom: [{ value: '', disabled: true }, [Validators.required]],
      HoursTo: [{ value: '', disabled: true }, [Validators.required]],
      NooOfCMRLStaff: [{ value: '', disabled: true }, [Validators.required]],
      NooOfContratStaff: [{ value: '', disabled: true }, [Validators.required]],
      ContactNo: [{ value: '', disabled: true }],
      CreatedBy: [{ value: '', disabled: true }],
      Status: [{ value: '', disabled: true }],
      CreatedON: [{ value: '', disabled: true }],
      Email: [{ value: '', disabled: true }],
      ApplicationID: [{ value: '', disabled: true }],
      Remarks:['']
    })
  }
  getstationlist() {
    let model = {};
    this.appService.getstationlist(model).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.stationlist = data;
      })
  }
  getrequestapplndetl(id:any) {
    let inputmodel = {
      ApplicationID:id
    }
    this.appService.getrequestapplndetl(inputmodel).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.newrequestForm.setValue(data[0]);
      })
  }
  formsubmit(flag: number) {
    if (this.newrequestForm.controls['Remarks'].value == '' && flag == 0) {
      this.remarks_required = true;
      return;
    }
    else {
      this.remarks_required = false;
      let model = {
        id: this.newrequestForm.controls['Id'].value,
        remarks: this.newrequestForm.controls['Remarks'].value,
        status: flag
      };
      this.appService.insertrequestapproval(model).pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.stationlist = data;
          this.dialog.open(CustomModalComponent, {
            width: '400px',
            panelClass: 'custom-dialog-container', // Optional for further styling
            data: { title: 'Success', message: `Application Approved Suceessfully..!` }
          });
        })
    }
  }
  
}
