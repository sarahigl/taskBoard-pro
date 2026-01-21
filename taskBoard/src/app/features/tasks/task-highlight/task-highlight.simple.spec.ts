import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHighlight } from './task-highlight';
import { provideRouter } from '@angular/router';

    describe('TaskHighlight', () => {
        it('devrait initialiser title avec une chaîne vide', () => {
            const component = new TaskHighlight();
            expect(component.title).toBe('');
        });
        it('devrait permettre de changer le titre', () => {
            const component = new TaskHighlight();
            component.title = 'Tâche en avant';
            expect(component.title).toBe('Tâche en avant');
        });
    });

describe('TaskHighlight', () => {
    let component: TaskHighlight;
    let fixture: ComponentFixture<TaskHighlight>;

    beforeEach(async () => {
        // Configuration du module de test
        await TestBed.configureTestingModule({
        imports: [TaskHighlight],
        providers: [
        provideRouter([])
      ]
        }).compileComponents();

        // Création du composant
        fixture = TestBed.createComponent(TaskHighlight);
        component = fixture.componentInstance;
    });

    it('devrait afficher le titre dans le DOM', () => {
        // ARRANGE : Définir le titre
        component.title = 'Ma tâche';
        
        // ACT : Mettre à jour le template
        fixture.detectChanges(); // ⚠️ IMPORTANT !

        // ASSERT : Vérifier le DOM
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('p')?.textContent)
        .toContain('Ma tâche');
    });
});