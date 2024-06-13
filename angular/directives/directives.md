[Angular Notes](/index.md)

## Directives

In Angular, a directive is a class that allows you to extend or manipulate the behavior of elements in the DOM. Directives are an essential feature of Angular, providing a way to enhance the capabilities of HTML by adding new syntax and behaviors. There are three types of directives in Angular:

1. **Component Directives**
2. **Structural Directives**
3. **Attribute Directives**

### 1. Component Directives

A component directive is the most common type of directive in Angular. It defines a custom HTML element that can be used in templates. Technically, every Angular component is a directive with a template.

Example:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<p>This is an example component!</p>',
  styles: ['p { color: blue; }']
})
export class ExampleComponent {}
```
Usage in template:
```html
<app-example></app-example>
```

### 2. Structural Directives

Structural directives change the DOM layout by adding or removing elements. They are used to shape or reshape the DOM's structure. The most common structural directives are `ngIf`, `ngFor`, and `ngSwitch`.

#### `ngIf`

Conditionally includes a template based on the value of an expression.
```html
<p *ngIf="isVisible">This text is conditionally visible.</p>
```

#### `ngFor`

Repeats a node for each item in a collection.
```html
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>
```

#### `ngSwitch`

Conditionally includes one of several possible templates.
```html
<div [ngSwitch]="condition">
  <p *ngSwitchCase="'case1'">Case 1</p>
  <p *ngSwitchCase="'case2'">Case 2</p>
  <p *ngSwitchDefault>Default case</p>
</div>
```

### 3. Attribute Directives

Attribute directives change the appearance or behavior of an element, component, or another directive. Unlike structural directives, they do not change the DOM structure.

#### Example: `ngClass`

Dynamically adds or removes CSS classes based on an expression.
```html
<p [ngClass]="{ 'highlight': isHighlighted }">Highlight me!</p>
```

#### Example: Creating a Custom Attribute Directive

**Step 1: Generate a Directive**

Using Angular CLI, generate a new directive:
```bash
ng generate directive highlight
```

**Step 2: Implement the Directive**

In `highlight.directive.ts`:
```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight: string;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

**Step 3: Use the Directive in a Template**

```html
<p appHighlight="lightblue">Hover over me to see the highlight effect!</p>
```

### Summary

Directives in Angular are a powerful feature that allows you to extend HTML with new behavior and functionality. They come in three main types:

- **Component Directives**: Custom elements with a template, like any Angular component.
- **Structural Directives**: Change the DOM structure by adding or removing elements (`ngIf`, `ngFor`, `ngSwitch`).
- **Attribute Directives**: Change the appearance or behavior of elements without altering the DOM structure (`ngClass`, custom attribute directives).

Understanding how to create and use directives effectively allows you to build dynamic, responsive, and maintainable Angular applications.

### Some Component Topics

* Built-in directives (ngIf, ngFor, ngClass, ngStyle)
* Creating custom directives
* Structural vs attribute directives