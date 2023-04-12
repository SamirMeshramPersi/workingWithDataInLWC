import { createElement } from 'lwc';
import RelatedRecords from 'c/relatedRecords';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getRelatedContacts from '@salesforce/apex/RelatedRecordsController.getRelatedContacts';

// Register the Apex wire adapter
const getRelatedContactsAdapter = registerApexTestWireAdapter(getRelatedContacts);

describe('c-related-records', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('displays related records in a datatable', () => {
        // Create element
        const element = createElement('c-related-records', {
            is: RelatedRecords
        });
        element.recordId = '0010000000000001';

                document.body.appendChild(element);

        
        const mockRelatedRecords = [
            { Id: '1', Name: 'John Doe', Phone: '123-456-7890' },
            { Id: '2', Name: 'Jane Smith', Phone: '987-654-3210' }
        ];
        getRelatedContactsAdapter.emit(mockRelatedRecords);

        
        return Promise.resolve().then(() => {
            const datatable = element.shadowRoot.querySelector('lightning-datatable');
            expect(datatable.data).toEqual(mockRelatedRecords);
        });
    });

    it('updates related records when changes are saved', () => {
        const element = createElement('c-related-records', {
            is: RelatedRecords
        });
        element.recordId = '0010000000000001';

        document.body.appendChild(element);

        const mockRelatedRecords = [
            { Id: '1', Name: 'John Doe', Phone: '123-456-7890' },
            { Id: '2', Name: 'Jane Smith', Phone: '987-654-3210' }
        ];
        getRelatedContactsAdapter.emit(mockRelatedRecords);

        return Promise.resolve().then(() => {
            const datatable = element.shadowRoot.querySelector('lightning-datatable');
            datatable.draftValues = [
                { Id: '1', Name: 'John Doe', Phone: '555-555-5555' }
            ];
            datatable.dispatchEvent(new CustomEvent('save'));

            expect(getRelatedContactsAdapter.getLastConfig().accountId).toBe(element.recordId);
            expect(getRelatedContactsAdapter.getLastConfig().draftValues).toEqual([
                { Id: '1', Name: 'John Doe', Phone: '555-555-5555' }
            ]);
        });
    });
});
