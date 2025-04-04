import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, switchMap } from 'rxjs';
import { IProjectDetails } from 'src/app/shared/interfaces/project.details.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  private projectData = new BehaviorSubject<IProjectDetails>({
    title: '',
    projectDetails: '',
    keySkills: '',
  });
  data$ = this.projectData.asObservable();
  constructor() {
    this.getData();
  }
  setData(data: IProjectDetails) {
    localStorage.setItem('projectData', JSON.stringify(data));
    this.projectData.next(data);
  }

  getData() {
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      this.projectData.next(JSON.parse(storedData));
    }
  }
}
