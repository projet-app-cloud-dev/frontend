import {Component} from '@angular/core';
import {ApiService, Ok} from "../../../api/api.service";
import {Router} from "@angular/router";
import {Collection} from "../../../api/model";

@Component({
    selector: 'app-create-collection', templateUrl: "./create-collection.component.html", styles: []
})
export class CreateCollectionComponent {
    name: string;
    message: string;

    constructor(private apiService: ApiService, private router: Router) {
    }

    create() {
        this.apiService.createCollection(this.name).subscribe((res) => {
            if (res instanceof Ok<Collection>) {
                this.router.navigate(['/collection', res.value.id]);
            } else {
                this.message = "Échec de la création";
            }
        })
    }
}
