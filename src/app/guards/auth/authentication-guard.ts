import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication-service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  console.log('Authentication Guard: Checking access for route', state.url);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/auth/sign-in']);
  }
  return false;
};
