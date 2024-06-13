# What is Angular guards?
Angular Guards are a fundamental feature of Angular's routing mechanism, used to control access to routes in an Angular application. They can determine whether a user can navigate to a specific route, leave a route, load a module, or activate a child route. Angular provides several types of guards, including `CanActivate`, `CanActivateChild`, `CanDeactivate`, `Resolve`, and `CanLoad`.

### Example: CanActivate Guard

Let's create a simple example demonstrating how to use the `CanActivate` guard to control access to a route based on user authentication.

#### Step 1: Create an Authentication Service

First, create an authentication service that manages user authentication status.

```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
```

#### Step 2: Create the Auth Guard

Next, create the `AuthGuard` service that implements the `CanActivate` interface.

```typescript
// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

#### Step 3: Protect Routes Using the Auth Guard

Update the routing module to protect certain routes with the `AuthGuard`.

```typescript
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

#### Step 4: Implement the Components

Create basic components for home, login, and protected routes.

**Home Component**
```typescript
// src/app/components/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<h1>Home</h1>`
})
export class HomeComponent {}
```

**Login Component**
```typescript
// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <h1>Login</h1>
    <button (click)="login()">Login</button>
  `
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login();
    this.router.navigate(['/protected']);
  }
}
```

**Protected Component**
```typescript
// src/app/components/protected/protected.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-protected',
  template: `<h1>Protected Route</h1>`
})
export class ProtectedComponent {}
```

### Explanation

1. **Authentication Service (`AuthService`)**: Manages the authentication state of the user. Provides methods to log in, log out, and check if the user is logged in.
2. **Auth Guard (`AuthGuard`)**: Implements the `CanActivate` interface to control access to routes. If the user is logged in (`isLoggedIn` returns `true`), the guard allows navigation to the route. If not, it redirects the user to the login page.
3. **Routes Configuration**: In the `AppRoutingModule`, the `protected` route is guarded using the `AuthGuard`. This means the user must be authenticated to access this route.
4. **Components**: Basic components for the home, login, and protected routes.

This example demonstrates how to use Angular Guards to control access to routes, ensuring that only authenticated users can access certain parts of the application. You can extend this example to include other types of guards (`CanActivateChild`, `CanDeactivate`, `Resolve`, `CanLoad`) as needed for more complex routing scenarios.


# Angular guards types
Angular provides several types of guards to handle different aspects of route navigation. Here are the main types of guards with examples:

1. **CanActivate**: Checks if a route can be activated.
2. **CanActivateChild**: Checks if child routes can be activated.
3. **CanDeactivate**: Checks if a route can be deactivated.
4. **Resolve**: Pre-fetches data before activating a route.
5. **CanLoad**: Checks if a module can be loaded lazily.

### 1. CanActivate Guard

**Purpose**: Determines if a route can be activated.

#### Example

```typescript
// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
```

```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

### 2. CanActivateChild Guard

**Purpose**: Determines if child routes can be activated.

#### Example

```typescript
// auth-child.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthChildGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'parent',
    canActivateChild: [AuthChildGuard],
    children: [
      { path: 'child', component: ChildComponent }
    ]
  }
];
```

### 3. CanDeactivate Guard

**Purpose**: Determines if a route can be deactivated, useful for unsaved changes.

#### Example

```typescript
// unsaved-changes.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
```

```typescript
// your-component.component.ts
import { Component } from '@angular/core';
import { CanComponentDeactivate } from './unsaved-changes.guard';

@Component({
  selector: 'app-your-component',
  template: `<p>Your component content</p>`
})
export class YourComponent implements CanComponentDeactivate {
  canDeactivate(): boolean {
    return confirm('Do you want to discard your changes?');
  }
}
```

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'your-path', component: YourComponent, canDeactivate: [UnsavedChangesGuard] }
];
```

### 4. Resolve Guard

**Purpose**: Pre-fetches data before activating a route.

#### Example

```typescript
// data-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {
  resolve(): Observable<any> {
    return of({ data: 'resolved data' });
  }
}
```

```typescript
// data.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data',
  template: `<p>{{ data | json }}</p>`
})
export class DataComponent implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.data = this.route.snapshot.data['resolvedData'];
  }
}
```

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'data', component: DataComponent, resolve: { resolvedData: DataResolverService } }
];
```

### 5. CanLoad Guard

**Purpose**: Determines if a module can be loaded lazily.

#### Example

```typescript
// auth-load.guard.ts
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
    canLoad: [AuthLoadGuard]
  }
];
```

### Summary

Angular Guards provide a robust mechanism to control navigation and data fetching in Angular applications. They ensure that routes are activated or deactivated based on specific conditions, pre-fetch necessary data, and manage lazy-loaded modules effectively. Each guard type serves a unique purpose and can be combined to create complex and secure routing logic in Angular applications.