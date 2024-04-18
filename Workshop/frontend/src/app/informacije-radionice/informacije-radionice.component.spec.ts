import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacijeRadioniceComponent } from './informacije-radionice.component';

describe('InformacijeRadioniceComponent', () => {
  let component: InformacijeRadioniceComponent;
  let fixture: ComponentFixture<InformacijeRadioniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacijeRadioniceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacijeRadioniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
