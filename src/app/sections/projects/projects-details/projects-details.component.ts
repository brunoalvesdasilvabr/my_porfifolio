import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { ProjectDetailsService } from './service/project-details.service';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
  standalone: true,
})
export class ProjectsDetailsComponent implements OnInit, OnDestroy {
  projectTitle!: string;
  subscription = new Subscription();
  constructor(private projectDetailsService: ProjectDetailsService) {}
  ngOnInit(): void {
    const subs$ = this.projectDetailsService.data$.subscribe((data) => {
      this.projectTitle = data.title;
    });
    this.subscription.add(subs$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
