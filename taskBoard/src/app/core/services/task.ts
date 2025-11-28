import { Injectable } from '@angular/core';
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

  getTasks(){
    return of(this.tasks).pipe(delay(1000));
  }
  
}
