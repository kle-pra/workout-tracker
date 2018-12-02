import { Exercise } from './../../models/exercise.model';
import { WorkoutService } from './../../services/workout.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.dataSource.data = this.workoutService.exercises;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
