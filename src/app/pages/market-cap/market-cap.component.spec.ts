import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCapComponent } from './market-cap.component';

describe('MarketCapComponent', () => {
  let component: MarketCapComponent;
  let fixture: ComponentFixture<MarketCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
