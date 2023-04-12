import { LightningElement, wire } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import FNAME from '@salesforce/schema/Contact.FirstName';
import LNAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const COLUMNS =[
   {label: 'First Name', fieldName: FNAME.fieldApiName, type:'text'}, 
   {label: 'Last Name', fieldName: LNAME.fieldApiName, type:'text'}, 
   {label: 'Email', fieldName: EMAIL.fieldApiName, type:'Email'} 
];


export default class ContactList extends LightningElement {
    columns = COLUMNS;
    @wire(getContacts)
    contacts;

    get errors() {
        return (this.contacts.error) ?
            reduceErrors(this.contacts.error) : [];
    }
}