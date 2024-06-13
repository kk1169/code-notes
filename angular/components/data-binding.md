[Angular Component](/angular/components/components.md)

In Angular, data binding is a powerful feature that allows you to establish a connection between the component and its template (view). There are several types of data binding mechanisms available in Angular, including interpolation, property binding, and event binding. Let's explore each of these in detail:

### 1. Interpolation (`{{ }}`)

Interpolation is a one-way data binding technique that allows you to insert the value of a component property into the HTML template. It is denoted by double curly braces `{{ }}`.

**Syntax:**
```html
<p>Welcome, {{ username }}</p>
```

**Usage:**
- Interpolation is used primarily for displaying dynamic data in the template.
- It can handle simple expressions and evaluates them within the context of the component.

### 2. Property Binding (`[ ]`)

Property binding allows you to set an element property to a value from the component. It is denoted by square brackets `[ ]`.

**Syntax:**
```html
<button [disabled]="isDisabled">Click me</button>
```

**Usage:**
- Use property binding to dynamically set an element property based on a component's property.
- It is commonly used for attributes like `src`, `href`, `disabled`, etc.

### 3. Event Binding (`( )`)

Event binding allows you to listen for events such as user input (clicks, keypresses, etc.) and trigger some functionality in the component. It is denoted by parentheses `( )`.

**Syntax:**
```html
<button (click)="onClick()">Click me</button>
```

**Usage:**
- Use event binding to respond to user actions like clicks, key presses, mouse events, etc.
- You can pass event objects or data to the event handler function using `$event`.

### Example of Combined Usage:

Here’s an example demonstrating how these binding techniques can be used together in an Angular component:

**Component (`app.component.ts`):**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  username = 'Alice';
  isDisabled = false;

  onClick() {
    console.log('Button clicked!');
    this.isDisabled = true;
  }
}
```

**Template (`app.component.html`):**
```html
<h1>Hello, {{ username }}!</h1>

<button [disabled]="isDisabled" (click)="onClick()">Click me</button>
```

In this example:
- **Interpolation** (`{{ username }}`) binds the value of `username` from the component to the HTML.
- **Property Binding** (`[disabled]="isDisabled"`) binds the `disabled` property of the `<button>` element to the `isDisabled` property in the component.
- **Event Binding** (`(click)="onClick()"`) binds the `click` event of the `<button>` element to the `onClick()` method in the component.

### Summary:

- **Interpolation** (`{{ }}`): One-way binding from component to template for displaying dynamic data.
- **Property Binding** (`[ ]`): One-way binding from component to template for setting element properties dynamically.
- **Event Binding** (`( )`): One-way binding from template to component for listening to and handling events triggered by user actions.

These binding techniques are fundamental to building dynamic and interactive Angular applications, allowing seamless communication between the component logic and the UI presented to the user.
