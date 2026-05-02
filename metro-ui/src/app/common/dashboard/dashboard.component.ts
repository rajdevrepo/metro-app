import { Component, OnInit } from '@angular/core';
import { AppManagementService } from '../../_services/app-management.service';
import { UnSub } from '../../../common/unsub';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends UnSub implements OnInit {
  countData: any;
  constructor(private appService: AppManagementService) {
    super();
  }
  ngOnInit() {
    let inputmodel = {
      UserID:'rajmalar21@gmail.com'
    };
    this.appService.getcategorywisecount(inputmodel).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.countData = data[0];
        console.log(data);
      });
  }
}
