import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaniOrganizatorComponent } from './postani-organizator.component';

describe('PostaniOrganizatorComponent', () => {
  let component: PostaniOrganizatorComponent;
  let fixture: ComponentFixture<PostaniOrganizatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostaniOrganizatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostaniOrganizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
