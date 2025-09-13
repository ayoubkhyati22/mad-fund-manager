import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';

// Services singleton
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    AuthService,
    StorageService,
    NotificationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
