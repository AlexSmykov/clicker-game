import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';
import { ParamService } from 'src/app/features/param/param.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  providers: [ResourceService, ParamService, UpgradeService],
})
export class AppComponent {}
