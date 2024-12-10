import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "@app/shared/data-access/auth.state.service";
import { map } from "rxjs";

export const privateGuard = ():CanActivateFn => {
    return () => {
        const router = inject(Router);
        const authState = inject(AuthStateService);

        return authState.authState$.pipe(
            map((state) => {
                console.log('private');
                
                console.log(state);
                
              if(!state){
                router.navigateByUrl('/auth/sign-in');
                return false;
              } 
              return true;
            })
        );
    }
}

export const publicGuard = ():CanActivateFn => {
    return () => {
        const router = inject(Router);
        const authState = inject(AuthStateService);

        return authState.authState$.pipe(
            map((state) => {
              console.log('public');
              
              console.log(state);
              
              if(state){
                router.navigateByUrl('dashboard');
                return false;
              } 
              return true;
            })
        );
    }
}