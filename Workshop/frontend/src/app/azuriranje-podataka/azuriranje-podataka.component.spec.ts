import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjePodatakaComponent } from './azuriranje-podataka.component';

describe('AzuriranjePodatakaComponent', () => {
  let component: AzuriranjePodatakaComponent;
  let fixture: ComponentFixture<AzuriranjePodatakaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjePodatakaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjePodatakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
