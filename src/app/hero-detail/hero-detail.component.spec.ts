import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { of } from "rxjs/observable/of";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {

  describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
      mockActivatedRoute = {
        snapshot: { paramMap: { get: () => { return '3'; }}}
      };
      mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
      mockLocation = jasmine.createSpyObj(['back']);

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HeroDetailComponent],
        providers : [
          { provide: ActivatedRoute, useValue: mockActivatedRoute},
          { provide: HeroService, useValue: mockHeroService },
          { provide: Location, useValue: mockLocation }
        ]
      });
      fixture = TestBed.createComponent(HeroDetailComponent);
    
      mockHeroService.getHero.and.returnValue(of({haid: 3, name: 'SuperDude', strength: 100}));
    });

    it('Should render hero name in a h2 tag', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });

    // it('Should call updateHero when save is called', fakeAsync(() => {
    //   mockHeroService.updateHero.and.returnValue(of({}));
    //   fixture.detectChanges();

    //   fixture.componentInstance.save();
    //   flush();

    //   expect(mockHeroService.updateHero).toHaveBeenCalled();
    // }));

    // it('Should call updatehero when save is called', async(() => {
    //   mockHeroService.updateHero.and.returnValue(of({}));
    //   fixture.detectChanges();

    //   fixture.componentInstance.save();
      
    //   fixture.whenStable().then(() => {
    //     expect(mockHeroService.updateHero).toHaveBeenCalled();
    //   });
    // }));
  });

});