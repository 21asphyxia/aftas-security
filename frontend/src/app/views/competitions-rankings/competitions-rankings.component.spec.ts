import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsRankingsComponent } from './competitions-rankings.component';

describe('CompetitionsRankingsComponent', () => {
  let component: CompetitionsRankingsComponent;
  let fixture: ComponentFixture<CompetitionsRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionsRankingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionsRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
