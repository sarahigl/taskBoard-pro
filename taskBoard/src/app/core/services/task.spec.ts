import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task';
import { TaskItem } from './task';
import { TasksPage } from '../../features/tasks/tasks-page/tasks-page';

describe('Task', () => {
  let service: Task;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('Task Service', () => {
  let service: Task;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Task]
    });
    service = TestBed.inject(Task);
    service.clearTasks(); // État propre
  });
  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });
  it('devrait ajouter une tâche', () => {
    service.addTask('Apprendre les tests');
    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Apprendre les tests');
  });

  it('devrait supprimer une tâche', () => {
    service.addTask('Tâche temporaire');
    const taskId = service.getTasks()[0].id;
    service.deleteTask(taskId);
    expect(service.getTasks().length).toBe(0);
  });
});


// 🎭 1️⃣ CRÉER LE MOCK (fausse version du service)
class MockTaskService {
  private tasks: TaskItem[] = [];
  private tasksSubject = new BehaviorSubject<TaskItem[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string): void {
    const newTask: TaskItem = { id: Date.now(), title };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }
}

describe('TasksPage avec Mock', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let mockService: MockTaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [
        // 🎭 2️⃣ UTILISER LE MOCK au lieu du vrai service
        { provide: Task, useClass: MockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    mockService = TestBed.inject(Task) as any;
    fixture.detectChanges();
  });

  it('devrait utiliser le mock pour ajouter une tâche', () => {
    // ACT : On appelle la méthode du composant
    component.addTask('Tâche mockée');

    // ASSERT : Le mock a bien simulé l'ajout
    mockService.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Tâche mockée');
    });
  });
});
