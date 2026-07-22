import { provideNoopAnimations } from '@angular/platform-browser/animations';

/**
 * Providers applied to every TestBed. Clarity components inject AnimationBuilder,
 * which throws NG03600 unless animation support is enabled. The app itself uses
 * provideAnimationsAsync(); tests use the noop renderer so assertions are not
 * racing real animations.
 */
export default [provideNoopAnimations()];
