/**
 * @description Hello World
 */
public with sharing class RelatedRecordsController {
     @AuraEnabled(cacheable=true)
       /**
     * @description Bar
     * @return Bar
     */
    public static List<Contact> getRelatedContacts(Id accountId) {
        List<Contact> relatedContacts = [SELECT Id, FirstName, LastName, Name, Phone FROM Contact WHERE AccountId = :accountId WITH SECURITY_ENFORCED];
        return relatedContacts;
    }
    
}