import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, afterNextRender } from '@angular/core';
import { takeUntil, timer } from 'rxjs';
import { ColDef, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AppManagementService } from '../../_services/app-management.service';
import { UnSub } from '../../../common/unsub';
import { Router, RouterModule } from '@angular/router';
import { PDFDocument, rgb } from 'pdf-lib';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrl: './approved-list.component.scss',
  providers: [DatePipe]
})
export class ApprovedListComponent extends UnSub implements OnInit, AfterViewInit {
  constructor(private appService: AppManagementService, @Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private router: Router, private datePipe: DatePipe) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  isBrowser: boolean = false;
  rowData: any[] = [];
  gridApi: any;
  pendingGridOption: any;
  columnDefs: ColDef[] = [];

  ngOnInit() {
    let inputmodel = {};
    this.appService.getpendingapproval(inputmodel).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.rowData = data;
      });
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.columnDefs = [
          { field: 'ApplicationId', headerName: 'Application Id', sortable: true, filter: true },
          { field: 'WorkDate', headerName: 'Work Request Date', sortable: true, filter: true },
          { field: 'EmployeeName', headerName: 'Employee Name', sortable: true, filter: true },
          { field: 'EmployeeCode', headerName: 'Employee Code', sortable: true, filter: true },
          { field: 'RequiredPermission', headerName: 'Request Category', sortable: true, filter: true },          
          {
            field: 'Id', headerName: 'Download', sortable: false, filter: false, width: 20,
            cellRenderer: (params: any) => {
              return `<button type="button" class="btn btn-outline-info btn-rounded btn-sm" mdbRipple rippleColor="dark">Download</button>`;
            },
            onCellClicked: (params: any) => {
              this.fillPdf(params.data.Id);
            }
          }
        ];
        this.pendingGridOption = <GridOptions>{
          pagination: true,  // Enable pagination
          domLayout: 'autoHeight', // Auto height for grid
          paginationPageSizeSelector: [10, 20, 50, 100],
          paginationPageSize: 10,
          defaultColDef: {
            editable: false,
            filter: true,
            flex: 1,
            minWidth: 100,
          },
          rowSelection: {
            mode: "multiRow",
            groupSelects: "descendants",
          },
          onGridReady: (params: GridReadyEvent) => {
            this.gridApi = params.api;
            //this.gridApi.setRowData(this.rowData);
            //this.pendingGridOption.api.sizeColumnsToFit();
          }
        };
      });
    }

  }
  onExport() {
    this.gridApi.exportDataAsCsv();
  }
  async fillPdf(id: number) {
    // Load existing PDF
    const url = 'assets/Template/Approval Template Textfield.pdf'; // Your PDF path
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Load PDFDocument
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // Get specific text fields by name and fill them
    const nameField = form.getTextField('name'); // Make sure your PDF has named fields
    nameField.setText('Robert');

    const dateField = form.getTextField('date');
    dateField.setText(new Date().toLocaleDateString());

    let datetime = new Date();

    const timeField = form.getTextField('report_time');
    timeField.setText(this.datePipe.transform(new Date(), 'hh:mm:ss a') || '');

    const stationname = form.getTextField('station_name');
    stationname.setText('Guindy');

    const emp_code = form.getTextField('emp_code');
    emp_code.setText('EMP-01');

    const designation = form.getTextField('designation');
    designation.setText('Technician');

    const department = form.getTextField('department');
    department.setText('Operational');

    const permission = form.getTextField('permission');
    permission.setText('Maintain The Area');

    const from_hrs = form.getTextField('from_hrs');
    from_hrs.setText('12:00 PM');

    const to_hrs = form.getTextField('to_hrs');
    to_hrs.setText('24:00 PM');

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();

    // Trigger download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'filled-form.pdf';
    link.click();
  }
}
