import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ColDef, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { isPlatformBrowser } from '@angular/common';
import { AppManagementService } from '../_services/app-management.service';
import { UnSub } from '../../common/unsub';

@Component({
  selector: 'app-work-completion',
  templateUrl: './work-completion.component.html',
  styleUrl: './work-completion.component.scss'
})
export class WorkCompletionComponent extends UnSub implements OnInit, AfterViewInit {
  constructor(
    private appService: AppManagementService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isBrowser: boolean = false;
  rowData: any[] = [];
  gridApi: any;
  gridOptions: any;
  columnDefs: ColDef[] = [];
  selectedRequest: any = null;
  showDetail: boolean = false;

  ngOnInit() {
    let inputmodel = {};
    this.appService.getpendingapproval(inputmodel).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.rowData = data.filter((item: any) => item.Status === 'Approved' || item.Status === 1);
      });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.columnDefs = [
          { field: 'ApplicationId', headerName: 'Application Id', sortable: true, filter: true },
          { field: 'WorkDate', headerName: 'Work Date', sortable: true, filter: true },
          { field: 'EmployeeName', headerName: 'Employee Name', sortable: true, filter: true },
          { field: 'EmployeeCode', headerName: 'Employee Code', sortable: true, filter: true },
          { field: 'RequiredPermission', headerName: 'Request Category', sortable: true, filter: true },
          {
            field: 'Id', headerName: 'Action', sortable: false, filter: false, width: 20,
            cellRenderer: (params: any) => {
              return `<button type="button" class="btn btn-outline-info btn-rounded btn-sm">View Details</button>`;
            },
            onCellClicked: (params: any) => {
              this.viewRequestDetail(params.data);
            }
          }
        ];
        this.gridOptions = <GridOptions>{
          pagination: true,
          domLayout: 'autoHeight',
          paginationPageSizeSelector: [10, 20, 50, 100],
          paginationPageSize: 10,
          defaultColDef: {
            editable: false,
            filter: true,
            flex: 1,
            minWidth: 100,
          },
          onGridReady: (params: GridReadyEvent) => {
            this.gridApi = params.api;
          }
        };
      });
    }
  }

  viewRequestDetail(data: any) {
    this.selectedRequest = data;
    this.showDetail = true;
  }

  closeDetail() {
    this.showDetail = false;
    this.selectedRequest = null;
  }
}
