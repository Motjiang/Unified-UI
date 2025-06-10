import { ApplicationRef, ComponentRef, createComponent, Injectable, Injector } from '@angular/core';
import { NotificationMessageComponent } from '../notification-message/notification-message.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

   private modalRef?: ComponentRef<NotificationMessageComponent>;

  constructor(private appRef: ApplicationRef) {}

  showNotification(isSuccess: boolean, title: string, message: string) {
    // Create modal dynamically
    this.modalRef = createComponent(NotificationMessageComponent, {
      environmentInjector: this.appRef.injector
    });

    const instance = this.modalRef.instance;
    instance.title = title;
    instance.message = message;
    instance.isSuccess = isSuccess;

    this.appRef.attachView(this.modalRef.hostView);
    const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

     setTimeout(() => instance.show());
  }
}
