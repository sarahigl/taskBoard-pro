import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: "courses" },
    { id: 2, title: "sport" },
    { id: 3, title: "devoir" }
  ]; 

  private lastId = 3;

  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string){
    const newTask = { id: ++this.lastId, title};
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  // getTasks(){
  //   return of(this.tasks).pipe(delay(1000));
  // }
  
}
