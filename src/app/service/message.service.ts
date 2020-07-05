import { Injectable } from "@angular/core";

export class Notification {
  id: string;
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class MessageService {
  notifications: Notification[] = [];

  add(txt: string) {
    this.notifications.push({
      id: Date.now().toString(16),
      message: txt
    });
  }

  clear(id: string) {
    this.notifications.forEach((notification, notificationIndex) => {
      if (notification.id === id) {
        this.notifications.splice(notificationIndex, 1);
      }
    });
  }
}
