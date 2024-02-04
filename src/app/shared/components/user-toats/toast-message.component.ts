import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";

@Component({
    selector: 'admin-toast-message',
    templateUrl: './toast-message.component.html',
    styleUrls: ['./toast-message.component.scss']
})
export class AdminToastMessageComponent implements OnInit {
    @Input() message!: {
        message: string,
        class: string
    } | null;
    @Output() closeModal = new EventEmitter<void>();

    textToShow: string = '';
    colorToShow: string = '';

    ngOnInit(): void {
        if (this.message) {
            this.textToShow = this.message.message;
            this.colorToShow = this.message.class;
            this.setTimerToRemove();
        }
    }

    onCloseModal() {
        this.closeModal.emit();
    }

    private setTimerToRemove(): void {
        setTimeout(() => {
            this.closeModal.emit();
        }, 1000); 
    }
}