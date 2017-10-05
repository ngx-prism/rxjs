# @ngx-prism/rxjs

Simple Angular 2+ Prism highlighter module with Rxjs.

Here is [@ngx-prism/core](https://github.com/ngx-prism/core) without Rxjs.

----

* [Demonstration](#demonstration)
* [Installation](#installation)
* [Usage](#usage)
* [PrismComponent](#prismcomponent)
  * [@Input](#input)
  * [Lifecycle Hooks](#lifecycle-hooks)
* [Scripts](#scripts)
* Git
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)
* [Donate](#donate)

----



## Demonstration

If you want to see how **@ngx-prism/rxjs** works with **@angular/cli**, get simple example demonstration usage from github [repository](https://github.com/ngx-prism/demo) by opening your command line and do the following:

```bash
git clone https://github.com/ngx-prism/demo.git
```

Go to file `src/app/app.module.ts` line 3 comment it, and uncomment line 4.  
Go to file `src/style.css` comment line 2 and uncomment line 3.

```bash
npm install && npm start
```

Open http://localhost:4200/ in your browser.

## Installation

To install, run:

```bash
npm install @ngx-prism/rxjs --save
```

## Usage

1. Import `PrismModule` into your module.

```typescript
// example.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrismModule } from '@ngx-prism/rxjs';
import { ExampleComponent } from './example.component';

@NgModule({
  declarations: [ ExampleComponent ],
  imports: [ CommonModule, PrismModule ],
  exports: [ ExampleComponent ]
})
export class ExampleModule { }
```

2. Use prism component in your example component.

```typescript
// example.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'example-component',
  template: `
    <prism-highlight [language]="language">
      {{content}}
    </prism-highlight>
  `
})
export class ExampleComponent {
  language = 'html';
  content = '<p>test</p>';
  constructor() { }
}
```

Use `PrismComponent` by providing `code` and `interpolation` property in `ExampleComponent`.

```typescript
// example.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'example-component',
  template: `
    <prism-highlight
      [language] = "language"
      [hooks] = "hooks"
      [code] = "content"
      [interpolation] = "interpolate"
    ></prism-highlight>`
})
export class ExampleComponent {
  content = '<p>test {{language}}</p>';
  hooks = {
    'before-sanity-check': (env) => { console.log(`before-sanity-check`, env); },
    'before-highlight': (env) => { console.log(`before-highlight`, env); },
    'after-highlight': (env) => { console.log(`after-highlight`, env); },
    'complete': (env) => { console.log(`complete`, env); },
    'before-insert': (env) => { console.log(`before-insert`, env); }
  };
  interpolate = {
    language: 'language interpolated'
  };
  language = 'html';
  constructor() { }
}
```

* It is possible to import themes files in `@angular/cli` like below.

```css
@import '~@ngx-prism/rxjs/dist/themes/prism-coy.css';
@import '~@ngx-prism/rxjs/dist/themes/prism-dark.css';
@import '~@ngx-prism/rxjs/dist/themes/prism-funky.css';
@import '~@ngx-prism/rxjs/dist/themes/prism-okaidia.css';
@import '~@ngx-prism/rxjs/dist/themes/prism-solarizedlight.css';
@import '~@ngx-prism/rxjs/dist/themes/prism-tomorrow.css';
@import '~@ngx-prism/rxjs/dist/themes/prism-twilight.css';
@import '~@ngx-prism/rxjs/dist/themes/prism.css';
```

## PrismComponent

It is designed to use `ng-content` and property `code` separately. You can **NOT** use both the same time.

### @Input

| name | Type | Description |
|----------|----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| async | boolean | Works only with `ng-content`. *"Whether to use Web Workers to improve performance and avoid blocking the UI when highlighting very large chunks of code."* - prismjs |
| callback | (element: Element) => void \| undefined = undefined | *"An optional callback to be invoked after the highlighting is done. Mostly useful when async is true, since in that case, the highlighting is done asynchronously."* - prismjs  |
| code | string | *"A string with the code to be highlighted."* - prismjs |
| **hooks** | Object | Callback with specific execute time and name: `before-sanity-check`, `before-highlight`, `after-highlight`, `complete`, `before-insert`. |
| **interpolation** | Object \| undefined | Data property values to inject.  |
| language | string | *"Valid language identifier, for example 'javascript', 'css'."* - prismjs |


### Lifecycle Hooks

[Angular Lifecycle Hooks](https://angular.io/guide/lifecycle-hooks)

**ngAfterViewInit()**    
Performs `highlightElement(element, async, callback)` prismjs method when.

**ngOnChanges()**    
Detect input property `code` or `language` changes by comparing `currentValue` to `previousValue`.    
If yes, set component property `change` to `true`.    

**ngOnDestroy()**   
Unsubscribe Rxjs.Subject subscription in Object property `subscription.code` and `subscription.language`.

**constructor()**  
Initiate subscribes to property `code` and `language`.

## Scripts

Clone repository:

```bash
git clone https://github.com/ngx-prism/rxjs.git
```

Go to just created folder:

```bash
cd rxjs
```

To build a clean package, means before that script removes node_modules, dist folder and install dependencies:

```bash
npm run start:clean
```

To build a package:

```bash
npm start
```

To run karma tests:

```bash
npm test
```

## GIT

### Commit

- [AngularJS Git Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)   
- [Karma Git Commit Msg](http://karma-runner.github.io/0.10/dev/git-commit-msg.html)

### Versioning

[Semantic Versioning 2.0.0](http://semver.org/)

**Given a version number MAJOR.MINOR.PATCH, increment the:**  
MAJOR version when you make incompatible API changes,  
MINOR version when you add functionality in a backwards-compatible manner, and  
PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.   

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?
>The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

>If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © ngx-prism

## Donate

[Click to donate](https://donorbox.org/help-creating-open-source-software)
