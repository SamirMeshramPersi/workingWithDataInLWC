@isTest
/**
 * @description Hello World
 */
public class RelatedRecordsControllerTest {

    @testSetup
    static void setup() {
        Account testAccount = new Account(Name='Test Account');
        insert testAccount;

        Contact testContact1 = new Contact(AccountId=testAccount.Id, FirstName='John', LastName='Doe', Phone='(123) 456-7890');
        insert testContact1;

        Contact testContact2 = new Contact(AccountId=testAccount.Id, FirstName='Jane', LastName='Smith', Phone='(123) 555-1212');
        insert testContact2;
    }

    @isTest
    static void testGetRelatedContacts() {
        Account testAccount = [SELECT Id, Name FROM Account LIMIT 1];

        Test.startTest();

        List<Contact> relatedContacts = RelatedRecordsController.getRelatedContacts(testAccount.Id);

        Test.stopTest();

        System.assertEquals(2, relatedContacts.size(), 'Expected two related contacts');
        System.assertEquals('John', relatedContacts[0].FirstName, 'First related contact should be John');
        System.assertEquals('Smith', relatedContacts[1].LastName, 'Second related contact should be Smith');
    }
}
