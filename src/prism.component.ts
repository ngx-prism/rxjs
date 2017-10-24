// external
import {
  AfterViewInit,
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash-es';
import { Subscribe } from '@ngx-reactive/decorator';

// internal
import { PrismClass } from './prism.class';
import { PrismService } from './prism.service';
import { SanitizedType } from './prism.type';

/**
 * @export
 * @class PrismComponent
 * @extends {PrismClass}
 * @implements {AfterViewInit}
 * @implements {OnChanges}
 * @implements {OnInit}
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ PrismService ],
  selector: 'prism-highlight',
  templateUrl: './prism.component.html'
})
@Subscribe<SanitizedType>(['code', 'language'])
export class PrismComponent extends PrismClass implements AfterViewInit, OnChanges, OnInit {

  code$: Observable<SanitizedType>;
  code$$$: Subscription;
  language$: Observable<SanitizedType>;
  language$$$: Subscription;

  /**
   * @memberof PrismComponent
   */
  ngOnInit() {
    this.code$$$ = this.code$.subscribe({
      next: (code: SanitizedType) => {
        if (this.codeElementRef) {
          if (this.change === true) {
            this.codeElementRef.nativeElement.innerHTML = code;
            this.prismService.highlightElement(this.codeElementRef);
            this.change = false;
          }
        }
      }
    });
    this.language$$$ = this.language$.subscribe({
      next: (language: string) => {
        if (this.codeElementRef) {
          if (this.change === true) {
            this.prismService.highlightElement(this.codeElementRef);
            this.change = false;
          }
        }
      }
    });
  }

  /**
   * Creates an instance of PrismComponent.
   * @param {PrismService} prismService
   * @memberof PrismComponent
   */
  constructor(public prismService: PrismService) {
    super(prismService);
  }

  /**
   * @memberof PrismComponent
   */
  ngAfterViewInit() {
    this.prismService.highlightElement(this.codeElementRef);
  }

  /**
   * Detect `code` and `language` property changes.
   * @param {SimpleChanges} changes
   * @memberof PrismComponent
   */
  ngOnChanges(changes: SimpleChanges) {
    this.onChanges(['code', 'language'], changes);
  }
}
