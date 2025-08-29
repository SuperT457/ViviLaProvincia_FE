import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioEvento } from './dettaglio-evento';

describe('DettaglioEvento', () => {
  let component: DettaglioEvento;
  let fixture: ComponentFixture<DettaglioEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioEvento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettaglioEvento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
