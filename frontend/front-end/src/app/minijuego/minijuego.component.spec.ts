import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinijuegoComponent } from './minijuego.component';

describe('MinijuegoComponent', () => {
  let component: MinijuegoComponent;
  let fixture: ComponentFixture<MinijuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinijuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinijuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
