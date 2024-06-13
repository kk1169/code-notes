[Angular Notes](/index.md)

## Components

In Angular, a component is a fundamental building block for creating user interfaces. A component controls a portion of the screen, encapsulates the logic and view related to that portion, and defines how it should interact with other parts of the application. Components are central to Angular's architecture and enable the creation of reusable, modular, and maintainable code.

### Key Parts of an Angular Component

1. **Component Class**: Contains the logic and data for the component. It is written in TypeScript and includes properties and methods that can be used in the template.
2. **Template**: Defines the HTML view of the component. It can include Angular directives, bindings, and other components.
3. **Styles**: CSS or SCSS that applies specifically to the component. Angular supports encapsulated styles to prevent them from affecting other components.
4. **Metadata**: Decorates the component class with metadata using the `@Component` decorator to specify its selector, template, and styles.

### Example of an Angular Component

Let's go through an example to illustrate how components work in Angular:

**1. Component Class (`app.component.ts`)**:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // The component's CSS element selector
  templateUrl: './app.component.html', // The location of the component's template file
  styleUrls: ['./app.component.css'] // The location of the component's private CSS styles
})
export class AppComponent {
  title = 'My Angular App';
  username = 'Alice';
  isDisabled = false;

  onClick() {
    console.log('Button clicked!');
    this.isDisabled = true;
  }
}
```

**2. Component Template (`app.component.html`)**:
```html
<div>
  <h1>{{ title }}</h1>
  <p>Hello, {{ username }}!</p>
  <button [disabled]="isDisabled" (click)="onClick()">Click me</button>
</div>
```

**3. Component Styles (`app.component.css`)**:
```css
h1 {
  color: blue;
}

button {
  background-color: lightblue;
}
```

### Key Concepts

1. **Selector**: The `selector` property in the `@Component` decorator defines the custom HTML tag that represents the component. In this example, `<app-root>` is the selector, so this component will be used in HTML as `<app-root></app-root>`.

2. **Template and TemplateUrl**: The `templateUrl` property points to the HTML file that defines the component's view. Alternatively, you can use the `template` property to provide an inline HTML string.

3. **Styles and StyleUrls**: The `styleUrls` property points to the CSS files that style the component. You can also use the `styles` property to provide inline styles.

4. **Data Binding**: 
   - **Interpolation**: `{{ title }}` binds the component's `title` property to the view.
   - **Property Binding**: `[disabled]="isDisabled"` binds the `isDisabled` property to the `disabled` attribute of the button.
   - **Event Binding**: `(click)="onClick()"` binds the button's click event to the `onClick` method in the component class.

### Creating a Component Using Angular CLI

Angular CLI (Command Line Interface) is a powerful tool for generating components and other Angular constructs quickly and consistently.

To generate a new component, run:
```bash
ng generate component component-name
```

This command will create the following files:
- `component-name.component.ts` (Component Class)
- `component-name.component.html` (Template)
- `component-name.component.css` (Styles)
- `component-name.component.spec.ts` (Unit Test File)

### Summary

In Angular, a component is a cohesive block of code that encapsulates the logic, view, and styling for a portion of the user interface. Components are defined using the `@Component` decorator, and they consist of a TypeScript class, an HTML template, and optional CSS styles. Components interact with each other through data binding and event handling, making them the core building blocks of Angular applications.


### Some Component Topics

* [Creating and using components](/angular/components/create-component.md)
* [Component lifecycle hooks](/angular/components/life-cycle-hook.md)
* Component templates and styles
* [Data binding (interpolation, property binding, event binding)](/angular/components/data-binding.md)
* [Input and Output decorators for parent-child communication](/angular/components/communication.md)