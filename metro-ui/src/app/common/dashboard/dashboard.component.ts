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
  private circumference = 2 * Math.PI * 70;

  constructor(private appService: AppManagementService) {
    super();
  }

  ngOnInit() {
    let inputmodel = {
      UserID: 'rajmalar21@gmail.com'
    };
    this.appService.getcategorywisecount(inputmodel).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.countData = data[0];
      });
  }

  private getTotal(): number {
    if (!this.countData) return 1;
    return (this.countData.Pending || 0) + (this.countData.Approved || 0) + (this.countData.Rejected || 0) || 1;
  }

  getPercentage(value: number): number {
    return (value / this.getTotal()) * 100;
  }

  getPendingDash(): string {
    const pct = (this.countData.Pending || 0) / this.getTotal();
    return `${pct * this.circumference} ${this.circumference}`;
  }

  getApprovedDash(): string {
    const pct = (this.countData.Approved || 0) / this.getTotal();
    return `${pct * this.circumference} ${this.circumference}`;
  }

  getApprovedOffset(): string {
    const pendingPct = (this.countData.Pending || 0) / this.getTotal();
    return `${-pendingPct * this.circumference}`;
  }

  getRejectedDash(): string {
    const pct = (this.countData.Rejected || 0) / this.getTotal();
    return `${pct * this.circumference} ${this.circumference}`;
  }

  getRejectedOffset(): string {
    const pendingPct = (this.countData.Pending || 0) / this.getTotal();
    const approvedPct = (this.countData.Approved || 0) / this.getTotal();
    return `${-(pendingPct + approvedPct) * this.circumference}`;
  }
}
