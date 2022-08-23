import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  constructor() {
    console.log('DashboardComponent constructor');
  }

  ngOnInit(): void {
    console.log('DashboardComponent ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('DashboardComponent ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('DashboardComponent ngOnChanges');
  }

  ngAfterViewInit(): void {
    console.log('DashboardComponent ngAfterViewInit');
  }

}
