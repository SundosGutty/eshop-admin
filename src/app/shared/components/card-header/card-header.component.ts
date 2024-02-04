import { Component, Input } from "@angular/core";


@Component({
    selector: 'admin-card-header',
    templateUrl: './card-header.component.html',
    styleUrls: ['./card-header.component.scss']
})
export class AdminCardHeaderComponent{
    @Input() cardContent:{
        title: string,
        description : string,
        btnsPositionStyle: string,
        btns : {
            class: string,
            icon: string,
            routeTo?: string,
            action?:string
            btnText: string
        }[]
    } 

}