[Angular Component](/angular/components/components.md)

In Angular, lifecycle hooks are methods that allow you to tap into the lifecycle of a component or directive. They provide visibility into key moments of the component's lifecycle, such as when it is created, rendered, destroyed, and so on. These hooks allow you to perform actions at specific points in the lifecycle of a component.

Here are the commonly used lifecycle hooks in Angular:

### 1. **ngOnChanges**

- **Purpose:** Called when an input property of the component changes.
- **Usage:** Use it to respond to changes in input properties before Angular initializes the component.
- **Signature:**
  ```typescript
  ngOnChanges(changes: SimpleChanges) {
    // Handle changes
  }
  ```
- **Example:**
  ```typescript
  import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

  @Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
  })
  export class ChildComponent implements OnChanges {
    @Input() inputProp: string;

    ngOnChanges(changes: SimpleChanges) {
      if (changes.inputProp) {
        console.log('Input property changed:', changes.inputProp.currentValue);
      }
    }
  }
  ```

### 2. **ngOnInit**

- **Purpose:** Called once, after the component is initialized.
- **Usage:** Use it to initialize data or fetch data from a service.
- **Signature:**
  ```typescript
  ngOnInit() {
    // Initialization code here
  }
  ```
- **Example:**
  ```typescript
  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css']
  })
  export class ExampleComponent implements OnInit {
    ngOnInit() {
      console.log('Component initialized');
    }
  }
  ```

### 3. **ngAfterViewInit**

- **Purpose:** Called once after Angular initializes the component's views and child views.
- **Usage:** Use it for operations that need to manipulate the DOM or interact with child components after Angular initializes them.
- **Signature:**
  ```typescript
  ngAfterViewInit() {
    // View initialization code here
  }
  ```
- **Example:**
  ```typescript
  import { Component, AfterViewInit } from '@angular/core';

  @Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css']
  })
  export class ExampleComponent implements AfterViewInit {
    ngAfterViewInit() {
      console.log('View initialized');
    }
  }
  ```

### 4. **ngOnDestroy**

- **Purpose:** Called just before Angular destroys the component.
- **Usage:** Use it to cleanup resources such as subscriptions or DOM elements created in the component.
- **Signature:**
  ```typescript
  ngOnDestroy() {
    // Cleanup code here
  }
  ```
- **Example:**
  ```typescript
  import { Component, OnDestroy } from '@angular/core';

  @Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css']
  })
  export class ExampleComponent implements OnDestroy {
    ngOnDestroy() {
      console.log('Component destroyed');
    }
  }
  ```

### Additional Lifecycle Hooks:

- **ngDoCheck**: Called during every change detection run, immediately after ngOnChanges and ngOnInit.
- **ngAfterContentInit**: Called after Angular projects external content into the component's view or child views.
- **ngAfterContentChecked**: Called after Angular checks the content projected into the component.
- **ngAfterViewChecked**: Called after Angular checks the component's views and child views.
- **ngOnDestroy**: Called before Angular destroys the component.
