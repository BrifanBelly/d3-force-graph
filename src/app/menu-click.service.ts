import { Injectable, Component, Inject } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Injectable()
export class MenuClickService {
    constructor(private bottomSheet: MatBottomSheet, private snackBar: MatSnackBar, public dialog: MatDialog) {}

    menuItemClicked(item) {
        console.log(item);
        switch (item) {
            case 1: this.bottomSheet.open(BottomSheetOverviewExampleSheet);
            break;
            case 2: this.snackBar.open('THE EYE ICON', 'METHODS CAN BE CUSTOMISED AS PER PERSONAL USAGE', {
                duration: 2000,
              });
            break;
            case 3:
            const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                width: '500px',
                data: {name: '', animal: ''}
              });
            break;
            case 4:
            // this.node.fx = this.node.x;
            // this.node.fy = this.node.y;
            break;
        }
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'bottom-sheet-overview-example-sheet',
    template: `
   <h1>ACTIONS MENU</h1>
<p>
  LOREM
</p>
<p>
Times New Roman. But if you’re using p incorrectly, you’ll be in for an unpleasant surprise, as many of your paragraphs.
</p>
<p>
  YOUNG SIWARD: Thou liest, abhorred tyrant; with my sword
  I'll prove the lie thou speak'st.
</p>
<p>
  [They fight, and young Seward is slain.]
</p>
<p>
as many of your paragraphs  be equally spaced.
and so it wouldn’t be clear which line belongs with which speaker. How do we get finer control…
</p>
    `,
  })
  // tslint:disable-next-line:component-class-suffix
  export class BottomSheetOverviewExampleSheet {
    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }


  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'dialog-overview-example-dialog',
    template: `
    <h1>Details Form</h1>
    <p>
      LOREM
    </p>
    <p>
    Times New Roman. But if you’re using p incorrectly, you’ll be in for an unpleasant surprise, as many of your paragraphs.
    </p>
    <p>
      YOUNG SIWARD: Thou liest, abhorred tyrant; with my sword
      I'll prove the lie thou speak'st.
    </p>
    <p>
      [They fight, and young Seward is slain.]
    </p>
    <p>
    as many of your paragraphs  be equally spaced.
    and so it wouldn’t be clear which line belongs with which speaker. How do we get finer control…
    </p>`,
  })
  // tslint:disable-next-line:component-class-suffix
  export class DialogOverviewExampleDialog {
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
