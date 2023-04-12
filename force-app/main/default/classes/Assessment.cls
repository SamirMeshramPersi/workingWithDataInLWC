/**
 * @description Hello World
 */

Public with sharing class Assessment {
    /**
     * @description Bar
     * @return Bar
     */
    @AuraEnabled(cacheable=true)
         public static list<Account> latestAccount(){
                List<Account> acclist = [SELECT Name, Type, Industry, LastModifiedDate FROM Account  WITH SECURITY_ENFORCED LIMIT 10];
                return acclist;
           
    
    }
}