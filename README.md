# LMNOP
Little Movie Night Online Planner - a force.com dev project

Copyright (c) 2019 Tommy Coute

## Setup Instructions ##
The following custom objects and fields must be created:
1. Movie_Night__c - Main object coordinating and tracking movie night events
1.1. Comments__c (long text area) - Used by requestors to add any additional information (who to attend, etc)
1.2. Movie_Title__c (text, 255) - Displays the selected movie suggestion
1.3. Showtime__c (date/time) - The event date/time, used for the calendar and to determine when voting is over
2. Movie_Audience__c - Junction object between Movie Nights and Contacts
2.1. Contact__c (master-detail)
2.2. Movie_Night__c (master-detail)
3. Movie_Suggestion__c - Child of the Movie Night object for tracking movies suggested per event
3.1. IMDB_Id__c (text, 255) - The ID of the movie defined by IMDB, used to check for duplicate suggestions and to link to IMDB page
3.2. Movie_Night__c (master-detail)
3.3. Plot__c (text, 255) - A short summary of the movie plot per OMDb
3.4. Poster__c (text, 255) - A link to the movie poster per OMDb
3.5. Rated__c (text, 32) - The MPAA rating of the movie per OMDb
3.6. Runtime__c (text, 16) - The length of the movie in minutes per OMDb
3.7. Year__c (text, 4) - The year the movie was released per OMDb
4. Refreshment__c - Child of the Movie Night object for tracking food and drinks per event
4.1. Movie_Night__c (master-detail)

