import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeRadioniceComponent } from './moje-radionice.component';

describe('MojeRadioniceComponent', () => {
  let component: MojeRadioniceComponent;
  let fixture: ComponentFixture<MojeRadioniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojeRadioniceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MojeRadioniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
