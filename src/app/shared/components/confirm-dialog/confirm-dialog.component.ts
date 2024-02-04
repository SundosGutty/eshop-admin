import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'admin-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class AdminConfirmDialogComponent{
    @Input() content!: {
        title: string,
        description?: string,
        buttons: {
          title: string,
          class: string,
          response: boolean 
        }[]
      } | null;
      @Output() userResponded = new EventEmitter()

    userResponse(ans: boolean){
      this.userResponded.emit(ans)
    }


}