public with sharing class LeadController {
   public static List<Lead> getAllLeads(){
     return [Select Id From Lead];
   }
}