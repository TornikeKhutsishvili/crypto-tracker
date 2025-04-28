import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostVisitedComponent } from './most-visited.component';

describe('MostVisitedComponent', () => {
  let component: MostVisitedComponent;
  let fixture: ComponentFixture<MostVisitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostVisitedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostVisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
