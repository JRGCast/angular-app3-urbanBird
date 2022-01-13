import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereIsItComponent } from './where-is-it.component';

describe('WhereIsItComponent', () => {
  let component: WhereIsItComponent;
  let fixture: ComponentFixture<WhereIsItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhereIsItComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhereIsItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
