import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import getRelatedContacts from '@salesforce/apex/RelatedRecordsController.getRelatedContacts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Phone', fieldName: 'Phone', editable: true },
];

export default class RelatedRecords extends LightningElement {
    @api recordId;
    relatedRecords;
    draftValues = [];

    columns = COLUMNS;

    @wire(getRecord, { recordId: '$recordId', fields: ['Account.Name'] })
    account;

    @wire(getRelatedContacts, { accountId: '$recordId' })
    wiredContacts(result) {
        this.relatedRecords = result;
        if (result.data) {
            this.draftValues = [...result.data];
        }
    }

    handleSave(event) {
        const recordInputs = event.detail.draftValues.slice().map((draft) => {
            const fields = Object.assign({}, draft);
            return { fields };
        });

        const promises = recordInputs.map((recordInput) => updateRecord(recordInput));

        Promise.all(promises)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contacts updated',
                        variant: 'success',
                    })
                );
                this.draftValues = [];
                return refreshApex(this.relatedRecords);
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating records',
                        message: error.body.message,
                        variant: 'error',
                    })
                );
            });
    }
}
