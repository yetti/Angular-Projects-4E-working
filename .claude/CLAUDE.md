
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Resources

Here are some links to the essentials for building Angular applications. Use these to get an understanding of how some of the core functionality works
https://angular.dev/essentials/components
https://angular.dev/essentials/signals
https://angular.dev/essentials/templates
https://angular.dev/essentials/dependency-injection

## Best practices & Style guide

Here are the best practices and the style guide information.

### Coding Style guide

Here is a link to the most recent Angular style guide https://angular.dev/style-guide

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Define signal properties as `readonly`

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Firebase

- Import ALL Firestore symbols (`Firestore`, `collection`, `collectionData`, `doc`, `docData`, …) from `@angular/fire/firestore`. NEVER import them from `firebase/firestore` or `firebase/firestore/lite`, even though `firebase` is a direct dependency and editors will offer those paths.
  - Mixing sources loads more than one copy of the Firestore SDK. Objects then fail `instanceof` checks across copies, producing runtime errors such as `Expected type '_Query', but it was: a custom _CollectionReference object`.
  - `Firestore` from `firebase/firestore` is a plain class, not the injectable token. `inject()` on it throws `NG0201: No provider found for Firestore`.
- `firebase` is pinned to `^11` because `@angular/fire@20` depends on `firebase: ^11.8.0`. Upgrading to 12 reintroduces duplicate SDK copies. Verify with `npm ls firebase` — expect a single entry.
- Installs require `--legacy-peer-deps`: `@angular/fire@20` declares `@angular/core: ^20`, and this workspace is on Angular 22.
- Keep Firestore access inside a service (e.g. `core/services/tables.ts`) that exposes signals. Components must not call `collection()`/`collectionData()` directly — doing so forces every ancestor's test to provide Firebase.
