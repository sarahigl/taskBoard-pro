import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface TaskItem {
  id: number;
  title: string;
}
@Injectable({
  providedIn: 'root',
})
export class Task {
  getTasks(): TaskItem[] {
    return [...this.tasks];
  }
  private tasks: TaskItem[] = [
    { id: 1, title: "courses" },
    { id: 2, title: "sport" },
    { id: 3, title: "devoir" }
  ]; 

  private lastId = 3;

  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string){
    const newTask: TaskItem = { id: ++this.lastId, title };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  clearTasks() {
  this.tasks = [];
  this.tasksSubject.next(this.tasks);
}
}
