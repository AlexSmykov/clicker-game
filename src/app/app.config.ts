import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ClockService } from './features/event/clock.service';
import { SaveService } from './features/save/save.service';
import { StatService } from './features/stat/stat.service';
import { UnlockService } from './features/unlock/unlock.service';
import { UpgradeService } from './features/upgrade/upgrade.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
      inject(SaveService).start();
      inject(StatService).start();
      inject(ClockService).start();
      inject(UnlockService);
      inject(UpgradeService);
    }),
  ],
};
