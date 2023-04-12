
/**
 * @description Hello World
 */
public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    /**
     * @description Bar
     * @return Bar
     */

    
 
    public static List<Account> getAccounts()
  
    
    {

        return [
            SELECT Name, AnnualRevenue, Industry
            FROM Account
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];

        throw new AuraHandledException('Forced error');
    }
}