// external
import {
  AfterViewInit,
  Component,
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
import * as _ from 'lodash-es';

// internal
import { PrismClass } from './prism.class';
import { PrismService } from './prism.service';

/**
 * @export
 * @class PrismComponent
 * @extends {PrismClass}
 * @implements {OnDestroy}
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ PrismService ],
  selector: 'prism-highlight',
  templateUrl: './prism.component.html'
})
export class PrismComponent extends PrismClass implements AfterViewInit, OnChanges, OnDestroy {

  constructor(public prismService: PrismService) {
    super(prismService);
    this.subscribe();
  }

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

  /**
   * OnDestroy unsubscribe `code` and `language` subscription.
   * @memberof PrismComponent
   */
  ngOnDestroy() {
    if (this.subscription) {
      if (this.subscription.code) {
        this.subscription.code.unsubscribe();
      }
      if (this.subscription.language) {
        this.subscription.language.unsubscribe();
      }
    }
  }

  /**
   * Set subscribes with `prismService` to property `language` and `code`.
   * @memberof PrismComponent
   */
  subscribe() {
    this.subscription.language = this.prismService.subscribe('language', {
      next: language => {
        if (this.codeElementRef) {
          if (this.change === true) {
            this.prismService.highlightElement(this.codeElementRef);
            this.change = false;
          }
        }
      }
    });
    this.subscription.code = this.prismService.subscribe('code', {
      next: code => {
        if (this.codeElementRef) {
          if (this.change === true) {
            this.codeElementRef.nativeElement.innerHTML = code;
            this.prismService.highlightElement(this.codeElementRef);
            this.change = false;
          }
        }
      }
    });
  }
}
