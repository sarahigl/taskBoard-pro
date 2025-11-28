import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Task } from '../core/services/task';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  tasks$! : ReturnType<Task['getTasks']>;
  
  constructor(private task: Task){
    this.tasks$ = this.task.getTasks();
  }

  count = 0;
  intervalId: any;
  ngOnInit(){
    setInterval(() =>{
      this.count++;
    }, 500);
  }
  ngOnDestroy(){
    clearInterval(this.intervalId)
  }
}
