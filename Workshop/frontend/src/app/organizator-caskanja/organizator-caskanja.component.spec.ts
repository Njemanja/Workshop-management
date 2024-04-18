import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizatorCaskanjaComponent } from './organizator-caskanja.component';

describe('OrganizatorCaskanjaComponent', () => {
  let component: OrganizatorCaskanjaComponent;
  let fixture: ComponentFixture<OrganizatorCaskanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizatorCaskanjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizatorCaskanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
