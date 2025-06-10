import { ApplicationRef, ComponentRef, createComponent, Injectable, Injector } from '@angular/core';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
 private toastRef?: ComponentRef<ToastMessageComponent>;

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

  showToast(isSuccess: boolean, message: string) {
    // Create toast dynamically
    this.toastRef = createComponent(ToastMessageComponent, {
      environmentInjector: this.appRef.injector
    });

    const instance = this.toastRef.instance;
    instance.message = message;
    instance.isSuccess = isSuccess;

    this.appRef.attachView(this.toastRef.hostView);
    const domElem = (this.toastRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    setTimeout(() => instance.show());
  }
}
