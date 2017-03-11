import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeSelectorComponent } from './episode-selector.component';

describe('EpisodeSelectorComponent', () => {
  let component: EpisodeSelectorComponent;
  let fixture: ComponentFixture<EpisodeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
