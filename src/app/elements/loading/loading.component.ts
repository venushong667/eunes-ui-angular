import { Component, Inject } from '@angular/core';
import { InstanceConfigHolderService } from 'ng-busy';

@Component({
    selector: 'default-busy',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

    constructor(@Inject('instanceConfigHolder') private instanceConfigHolder: InstanceConfigHolderService) {
    }
  
    get message() {
        return this.instanceConfigHolder.config.message;
    }

}
