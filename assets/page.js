// Imports
; const                         // T
    MDCDialog                   // w
    =                           // i
    mdc.dialog.MDCDialog        //
; const                         // i
    MDCTopAppBar                // s
    =                           //
    mdc.topAppBar.MDCTopAppBar  // a
; const                         //
    MDCTextField                // c
    =                           // u
    mdc.textField.MDCTextField  // t
; const                         // e
    MDCFormField                //
    =                           // m
    mdc.formField.MDCFormField  // a
; const                         // r
    MDCRadio                    // e
    =                           // f
    mdc.radio.MDCRadio          // r
; const                         // i
    MDCRipple                   // e
    =                           // n
    mdc.ripple.MDCRipple        // d
; const                         //
    MDCList                     // ❤
    =                           //
    mdc.list.MDCList            //

// App bar
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

// Floating action button
const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));

// Dialogs
const addDialog = new MDCDialog(document.querySelector('.mdc-add-dialog'));
const deleteDialog = new MDCDialog(document.querySelector('.mdc-delete-dialog'));
const pluralDialog = new MDCDialog(document.querySelector('.mdc-plural-dialog'));

// Add dialog
const addAmount = new MDCTextField(document.querySelector('.mdc-text-field-add-amount'));
const addDescription = new MDCTextField(document.querySelector('.mdc-text-field-add-description'));
addAmount.prefixText = "+";
addAmount.suffixText = "£";

const addRadio = new MDCRadio(document.querySelector('.mdc-radio-add-currency'));
const addFormField = new MDCFormField(document.querySelector('.mdc-form-field-add-currency'));
addFormField.input = addRadio;

const addRadio2 = new MDCRadio(document.querySelector('.mdc-radio-add-action'));
const addFormField2 = new MDCFormField(document.querySelector('.mdc-form-field-add-action'));
addFormField2.input = addRadio2;