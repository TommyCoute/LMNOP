# LMNOP
Little Movie Night Online Planner - a force.com dev project

Copyright (c) 2019 Tommy Coute

## Setup Instructions ##
A managed/unmanaged package may be available in the future. For now, it is possible to manually install LMNOP in a Salesforce org by following the instructions below.

# The following custom objects and fields must be created:
1. Movie_Night__c - Main object for coordinating and tracking movie night events
1.1. Location__c (text, 255) - The event location for hosting a movie night
1.2. Movie_Title__c (text, 255) - Displays the selected movie suggestion
1.3. Showtime__c (date/time) - The event date/time, used for the calendar and to determine when voting is over
1.4. Unregistered_Audience__C (long text area) - Lists email addresses for audience members who have been invited to a movie night, but not yet registered
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
5. User - standard user object
5.1. lmnop_Disclaimer_Acknowledged__c - Records the date/time when the user acknowledged the lmnop community disclaimer

# The folling custom settings and fields must be created:
NOTE: in order to create new custom settings of type "List", you must enable "Manage List Custom Settings Type". This option is found under "Data", then "Schema Settings" within the Salesforce setup page.
1. API_Tokens__c (list) - Stores API tokens for use within apex code
1.1. Token__c (text, 255) - The API key/token to be used
Record: create an API token with the name "OMDb", and put your API token in the new Token__c field. You can obtain an OMDb API key from http://www.omdbapi.com/

# The follwing static resources must be created:
NOTE: all static resources listed below should be set to "Public"
1. jslmnop - JS 
2. lmnop - CSS
3. PosterNotFound - PNG image to be displayed if a poster is not found when searching OMDb
4. MovieTheater - Background image for LMNOP community, taken from https://commons.wikimedia.org/wiki/File:Sala_de_cine.jpg
