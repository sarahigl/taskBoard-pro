import { Component, inject, ViewChild, ViewContainerRef  } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Task, TaskItem } from '../../../core/services/task';
import { TaskHighlight } from '../task-highlight/task-highlight';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './tasks-page.html',
  styleUrls: ['./tasks-page.scss'],
})
export class TasksPage {

    private taskService = inject(Task);
    tasks$ = this.taskService.tasks$;

    addTask(title: string){
      this.taskService.addTask(title)
    }

    deleteTask(id: number) {
      this.taskService.deleteTask(id);
    }

  @ViewChild('highlightContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  highlight(task: TaskItem) {
    // Efface le contenu précédent
    this.container.clear();
    // Crée le composant TaskHighlight
    const ref = this.container.createComponent(TaskHighlight);
    // Passe les données au composant
    ref.instance.title = task.title;
  }
}
