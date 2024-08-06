import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  private projectData = new BehaviorSubject<{
    title: string;
    description: string;
  }>({ title: '', description: '' });
  data$ = this.projectData.asObservable();
  constructor() {
    this.getData();
  }
  setData(data: { title: string; description: string }) {
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
