# Angular Unit Testing (Jest)

Unit testing in Angular using Jest can be a more performant and flexible alternative to using Jasmine and Karma. Jest is a JavaScript testing framework maintained by Facebook, and it offers powerful features such as snapshot testing, parallel test execution, and a rich set of matchers.

### Key Topics in Angular Unit Testing with Jest

1. **Setting Up Jest in an Angular Project**
2. **Testing Components**
3. **Testing Services**
4. **Testing Directives**
5. **Testing Pipes**
6. **Mocking Dependencies**
7. **Asynchronous Testing**

### 1. Setting Up Jest in an Angular Project

First, you need to set up Jest in your Angular project. You can replace Karma and Jasmine with Jest using the `jest-preset-angular` package.

#### Installation

```bash
ng new my-app --routing --style=scss
cd my-app
npm install --save-dev jest jest-preset-angular @types/jest
```

#### Configuration

Create or update the following configuration files:

**`jest.config.js`**

```javascript
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/e2e/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
```

**`setup-jest.ts`**

```typescript
import 'jest-preset-angular/setup-jest';
```

**`tsconfig.spec.json`**

Make sure to update or create the `tsconfig.spec.json` file to include Jest types.

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest", "node"]
  },
  "files": ["src/test.ts", "setup-jest.ts"],
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

### 2. Testing Components

Use Jest to test Angular components by configuring `TestBed` and using Jest's matchers.

#### Example: Testing a Component

**Component to Test**

```typescript
// src/app/hello.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `<h1>Hello, {{name}}!</h1>`
})
export class HelloComponent {
  name: string = 'World';
}
```

**Component Test**

```typescript
// src/app/hello.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';
import { By } from '@angular/platform-browser';

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelloComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial name', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toBe('Hello, World!');
  });

  it('should change the name when updated', () => {
    component.name = 'Angular';
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toBe('Hello, Angular!');
  });
});
```

### 3. Testing Services

Services are an integral part of Angular applications, often used for business logic and data retrieval. Testing services ensures that they behave as expected.

#### Example: Testing a Service

**Service to Test**

```typescript
// src/app/data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getData(): string {
    return 'Hello from DataService';
  }
}
```

**Service Test**

```typescript
// src/app/data.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    const data = service.getData();
    expect(data).toBe('Hello from DataService');
  });
});
```

### 4. Testing Directives

Directives are used to add behavior to existing DOM elements.

#### Example: Testing a Directive

**Directive to Test**

```typescript
// src/app/highlight.directive.ts
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'color');
  }
}
```

**Directive Test**

```typescript
// src/app/highlight.directive.spec.ts
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<p appHighlight>Highlight me!</p>`
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should highlight text on mouse enter', () => {
    const p = fixture.debugElement.query(By.css('p'));
    p.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(p.nativeElement.style.color).toBe('blue');
  });

  it('should remove highlight on mouse leave', () => {
    const p = fixture.debugElement.query(By.css('p'));
    p.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    p.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(p.nativeElement.style.color).toBe('');
  });
});
```

### 5. Testing Pipes

Pipes are used to transform data in templates.

#### Example: Testing a Pipe

**Pipe to Test**

```typescript
// src/app/reverse.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

**Pipe Test**

```typescript
// src/app/reverse.pipe.spec.ts
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse the string', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('hello')).toBe('olleh');
  });
});
```

### 6. Mocking Dependencies

Mocking dependencies is crucial for isolating tests and avoiding side effects.

#### Example: Mocking a Service in a Component Test

**Mock Service**

```typescript
// src/app/mock-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getData(): string {
    return 'Mock data';
  }
}
```

**Component Test with Mock Service**

```typescript
// src/app/hello.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';
import { DataService } from './data.service';
import { MockDataService } from './mock-data.service';

describe('HelloComponent with Mock Service', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelloComponent],
      providers: [{ provide: DataService, useClass: MockDataService }],
    }).compileComponents();
  });

  it('should use mock service', () => {
    const fixture = TestBed.createComponent(HelloComponent);
    const component = fixture.componentInstance;
    expect(component.dataService.getData()).toBe('Mock data');
  });
});
```

### 7. Asynchronous Testing

Angular testing utilities provide ways to handle asynchronous operations, such as HTTP requests or timers.

#### Example: Asynchronous Testing with `fakeAsync`

**Component with Async Operation**

```typescript
// src/app/async.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-async',
  template: `<p>{{ message }}</p>`
})
export class AsyncComponent {
  message: string = 'Loading...';

  asyncOperation() {
    setTimeout(() => {
      this.message =

 'Data loaded';
    }, 1000);
  }
}
```

**Asynchronous Test**

```typescript
// src/app/async.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AsyncComponent } from './async.component';

describe('AsyncComponent', () => {
  let component: AsyncComponent;
  let fixture: ComponentFixture<AsyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsyncComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update message after async operation', fakeAsync(() => {
    component.asyncOperation();
    tick(1000);
    fixture.detectChanges();
    expect(component.message).toBe('Data loaded');
  }));
});
```

### Summary

Unit testing in Angular using Jest involves setting up the testing environment, writing tests for components, services, directives, and pipes, mocking dependencies, and handling asynchronous operations. By leveraging Jest's powerful features, you can write efficient and maintainable tests for your Angular application.


# Interview Questions

Sure! Here are some common Angular unit testing interview questions along with their answers:

### 1. What is unit testing in Angular?

**Answer**: Unit testing in Angular involves testing individual units or components of the application in isolation from other parts. The purpose is to ensure that each unit functions as expected. Angular provides a testing framework that includes tools like Jasmine for writing test cases and Karma or Jest for running tests.

### 2. How do you set up Jest for unit testing in an Angular project?

**Answer**:
1. Install Jest and related dependencies:
   ```bash
   npm install --save-dev jest jest-preset-angular @types/jest
   ```
2. Create or update `jest.config.js`:
   ```javascript
   module.exports = {
     preset: 'jest-preset-angular',
     setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
     testPathIgnorePatterns: ['/node_modules/', '/dist/', '/e2e/'],
     globals: {
       'ts-jest': {
         tsconfig: 'tsconfig.spec.json',
         stringifyContentPathRegex: '\\.html$',
       },
     },
     transform: {
       '^.+\\.(ts|js|html)$': 'ts-jest',
     },
     moduleNameMapper: {
       '^src/(.*)$': '<rootDir>/src/$1',
     },
   };
   ```
3. Create `setup-jest.ts`:
   ```typescript
   import 'jest-preset-angular/setup-jest';
   ```
4. Update `tsconfig.spec.json` to include Jest types:
   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "outDir": "./out-tsc/spec",
       "types": ["jest", "node"]
     },
     "files": ["src/test.ts", "setup-jest.ts"],
     "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
   }
   ```

### 3. How do you test an Angular component?

**Answer**:
To test an Angular component, you typically use Angular's `TestBed` utility to configure a testing module and create an instance of the component.

Example:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelloComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hello, World!');
  });
});
```

### 4. What is the purpose of `ng-mocks` in Angular testing?

**Answer**: `ng-mocks` is a library that simplifies Angular testing by providing tools to create mock versions of Angular modules, components, services, and directives. It helps in creating a test environment where dependencies can be easily mocked, thus focusing tests on the unit being tested.

### 5. How do you mock a service in an Angular component test?

**Answer**: You can mock a service in an Angular component test by providing a mock implementation of the service using the `TestBed`.

Example:
```typescript
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HelloComponent } from './hello.component';

class MockDataService {
  getData() {
    return 'Mock data';
  }
}

describe('HelloComponent with Mock Service', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelloComponent],
      providers: [{ provide: DataService, useClass: MockDataService }],
    }).compileComponents();
  });

  it('should use mock service', () => {
    const fixture = TestBed.createComponent(HelloComponent);
    const component = fixture.componentInstance;
    expect(component.dataService.getData()).toBe('Mock data');
  });
});
```

### 6. What is `fakeAsync` and `tick` in Angular testing?

**Answer**: `fakeAsync` is a utility function that allows you to write synchronous tests for asynchronous code. It simulates the passage of time for code that uses timeouts, intervals, or promises. The `tick` function is used within a `fakeAsync` block to simulate the passage of time.

Example:
```typescript
import { fakeAsync, tick } from '@angular/core/testing';

it('should update message after async operation', fakeAsync(() => {
  let message = 'Loading...';
  setTimeout(() => {
    message = 'Data loaded';
  }, 1000);
  tick(1000);
  expect(message).toBe('Data loaded');
}));
```

### 7. How do you test an Angular pipe?

**Answer**: Testing an Angular pipe involves creating an instance of the pipe and calling its `transform` method with various inputs to verify the output.

Example:
```typescript
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse the string', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('hello')).toBe('olleh');
  });
});
```

### 8. How do you handle asynchronous operations in Angular unit tests?

**Answer**: Angular provides several utilities to handle asynchronous operations in unit tests, including `fakeAsync`, `tick`, and `async`.

- **`fakeAsync` and `tick`**: For simulating the passage of time in a synchronous manner.
- **`async` and `whenStable`**: For handling asynchronous operations that involve promises or other asynchronous tasks.

Example using `async`:
```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAsyncComponent } from './my-async.component';

describe('MyAsyncComponent', () => {
  let component: MyAsyncComponent;
  let fixture: ComponentFixture<MyAsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyAsyncComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle async operation', async(() => {
    component.asyncOperation();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.message).toBe('Data loaded');
    });
  }));
});
```

### 9. How do you use the `TestBed` in Angular testing?

**Answer**: `TestBed` is Angular's primary API for writing unit tests. It is used to configure and initialize the environment for unit testing by creating a test module that emulates an Angular module.

Example:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>;
  let component: MyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
```

### 10. How do you test Angular directives?

**Answer**: To test Angular directives, create a test component that uses the directive and then use Angular's testing utilities to verify the directive's behavior.

Example:
```typescript
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<p appHighlight>Highlight me!</p>`
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should highlight text on mouse enter', () => {
    const p = fixture.debugElement.query(By.css('p'));
    p.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(p.nativeElement.style.color).toBe('blue');
  });

  it('should remove highlight on mouse leave', () => {
    const p = fixture.debugElement.query(By.css('p'));
    p.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    p.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(p.nativeElement.style.color).toBe('');
  });
});
```

These questions and answers cover a range of topics in Angular unit testing and should help prepare for an interview focused on this area.