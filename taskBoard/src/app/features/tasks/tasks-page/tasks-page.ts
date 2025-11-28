import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Task } from '../../../core/services/task';

@Component({
  selector: 'app-tasks-page',
  imports: [AsyncPipe],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
})
export class TasksPage {

  private taskService = inject(Task);
  
  tasks$ = this.taskService.tasks$;
  
  /* constructor(private task: Task){
    this.tasks$ = this.task.getTasks();
  } */
 
  addTask(title: string){
    this.taskService.addTask(title)
  }

}
