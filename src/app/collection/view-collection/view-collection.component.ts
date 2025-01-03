import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiError, ApiResponse, ApiService, Ok} from "../../../api/api.service";
import {Card, Collection} from "../../../api/model";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-view-collection', templateUrl: 'view-collection.component.html', styles: []
})
export class ViewCollectionComponent implements OnInit {
    collection: Collection | null;
    errorMessage: string | null;

    constructor(private activatedRoute: ActivatedRoute, public apiService: ApiService, private dialog: MatDialog, private router: Router) {
    }

    onCollectionResult(res: ApiResponse<Collection, ApiError>) {
        if (res instanceof Ok<Collection>) {
            this.collection = res.value;
            this.errorMessage = null;
        } else {
            this.collection = null;
            if (res.value == ApiError.NotFound) {
                this.errorMessage = "Cette collection n'existe pas";
            } else {
                this.errorMessage = "Une erreur est survenue";
            }
        }
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.apiService.getCollection(params["id"]).subscribe((res) => this.onCollectionResult(res));
        });
    }

    openAddDialog(): void {
        this.dialog.open(AddNewCardDialog, {}).afterClosed().subscribe((res) => {
            this.apiService.setCardInCollection(this.collection?.id!, res[0], 1).subscribe((res) => {
                if (res.isOk()) {
                    this.apiService.getCollection(this.collection?.id!).subscribe((res) => this.onCollectionResult(res));
                } else {
                    if (res.value == ApiError.Unauthorized) {
                        alert("Vous ne pouvez pas modifier les collections des autres");
                    } else {
                        alert("Échec de l'ajout");
                    }
                }
            });
        });
    }

    removeCard(cardId: number): void {
        this.apiService.removeCardFromCollection(this.collection?.id!, cardId).subscribe((res) => {
            if (res.isOk()) {
                this.apiService.getCollection(this.collection?.id!).subscribe((res) => this.onCollectionResult(res));
            } else {
                if (res.value == ApiError.Unauthorized) {
                    alert("Vous ne pouvez pas modifier les collections des autres");
                } else {
                    alert("Échec de l'ajout");
                }
            }
        });
    }

    openEditCountDialog(cardId: number, originalValue: number): void {
        this.dialog.open(EditCardCountDialog, {
            data: {
                cardCount: originalValue
            }
        }).afterClosed().subscribe((res) => {
            console.log(res)
            this.apiService.setCardInCollection(this.collection?.id!, cardId, res[0]).subscribe((res) => {
                if (res.isOk()) {
                    this.apiService.getCollection(this.collection?.id!).subscribe((res) => this.onCollectionResult(res));
                } else {
                    if (res.value == ApiError.Unauthorized) {
                        alert("Vous ne pouvez pas modifier les collections des autres");
                    } else {
                        alert("Échec de l'ajout");
                    }
                }
            });
        });
    }

    delete() {
        this.apiService.removeCollection(this.collection?.id!).subscribe((res) => {
            if (res.isOk()) {
                this.router.navigate(["/"])
            } else {
                if (res.value == ApiError.Unauthorized) {
                    alert("Vous ne pouvez pas modifier les collections des autres");
                } else {
                    alert("Échec de l'ajout");
                }
            }
        });
    }
}

@Component({
    selector: 'add-new-card-dialog', templateUrl: 'add-new-card.dialog.html'
})
export class AddNewCardDialog {
    search: string
    searchResult: Card[]

    constructor(public apiService: ApiService) {
    }

    onSearchChange() {
        this.apiService.searchCards(this.search).subscribe((res) => {
            if (res instanceof Ok<Card[]>) {
                this.searchResult = res.value;
            } else {
                console.error("failed to retrieve cards");
            }
        });
    }
}


@Component({
    selector: 'edit-card-count-dialog', templateUrl: 'edit-card-count.dialog.html'
})
export class EditCardCountDialog {
    numberFormControl = new FormControl<number | null>(0, [Validators.required, Validators.pattern(/\d+/)]);

    constructor(@Inject(MAT_DIALOG_DATA) public data: { cardCount: number }) {
        this.numberFormControl.setValue(data.cardCount);
    }
}