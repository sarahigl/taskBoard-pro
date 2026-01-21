import { Component, inject, ViewChild, ViewContainerRef, ChangeDetectionStrategy  } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Task, TaskItem } from '../../../core/services/task';
import { TaskHighlight } from '../task-highlight/task-highlight';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tasks-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './tasks-page.html',
  styleUrls: ['./tasks-page.scss'],
})
export class TasksPage {

    private taskService = inject(Task);
    tasks$ = this.taskService.tasks$;

    addTask(title: string){
      this.taskService.addTask(this.sanitizeInput(title))
    }

    deleteTask(id: number) {
      this.taskService.deleteTask(id);
    }

    sanitizeInput(value: string): string {
      return value
        .trim()
        .replace(/[<>"'&;`]/g, '')
        .substring(0, 100);
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
