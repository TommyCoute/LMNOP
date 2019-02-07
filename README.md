Copyright (c) 2019 Tommy Coute

# Overview
The Little Movie Night Online Planner (LMNOP) is a force.com dev project intended to showcase my Salesforce work and abilities, while developing something that I find fun and personally interesting. No licenses or rights are granted, however all source code and related objects/settings are documented here for reference.

# Features
1. Custom community activity logging: includes a custom "activity" object to record user activity such as the pages viewed, search terms used, browser/OS info, IP address, and also prepares some of this data to pass to Google Analytics. Reports can be created directly in Salesforce and related lists appear under contacts as well.
2. Completely custom templates and styles: LMNOP uses the "Salesforce Tabs + Visualforce" community template to maximize customization and access to advanced features. This makes it possible to leverage existing Salesforce objects, controllers, and other features (such as authentication and security features), while gaining complete control over the user experience, business logic, and look/feel of the site.
3. Community self-registration: for some projects, it makes sense to control access by forcing users to request login credentials, or to enable authentication via Single Sign-On (SSO) from another application. For this project, we want users to be able to invite others to the community, so anyone can create their own account without any need for manual support.
4. Welcome (disclaimer) page: when users first visit LMNOP, they are presented with a welcome message. This is an opportunity to go over any rules or legal requirements before users can proceed into the community. Users must accept the disclaimer/agreement to proceed, and their acknowledgement is recorded in a custom field on their user record.
5. Profile customization and locale/time zone support: after accepting the site disclaimer, users are taken to their profile page, where they can update their name and time zone as desired. Future enhancements to this community could include the ability to set a profile photo, set language/locale options, or change their email address (tied to usernames and therefore unchangable for v1).
6. Event calendar: the LMNOP home page will look up any upcoming and past movie nights where the user is an audience member. Users can also create a new movie night from the home page. Any upcoming movie nights on the calendar include the showtime, location, current top movie suggestion, a countdown timer (formula field displaying number of days, hours, minutes, or seconds remaining), and the user's attendence status (organizing, attending, not attending).
7. Movie night manager: when creating a new movie night, users can enter the basics (showtime/location), and select the initial audience members to invite. Any contacts that attended the same movie night as the user are listed for selection, and users can enter email addresses to invite others. If any email addresses match existing contacts then they those contacts will be listed once the new movie night is created, and email notifications will be sent to all invited users (regardless of registration status). Users creating a new movie night are designated the "organizer" and can make updates to the event details or audience list at any time.
8. Movie suggestions: LMNOP uses the Open Movie Database (OMDb) API to search movie titles and add them to a list of movie suggestions per movie night. The list of currently suggested movies is displayed for users from the movie night detail page, along with the votes currently associated with that movie suggestion. Users can currently suggest as many movies as desired, although options to customize and control the number of suggestions or other parameters may be added in the future.
9. Movie voting and selection: the title selected for a given movie night is determined by audience member votes. Each audience member can choose to upvote or downvote (or abstain) each movie suggestion. Votes are tallied and displayed from the movie night detail page, along with a countdown timer until showtime. Once showtime is reached, the movie suggestion with the highest number of "points" (all upvotes minus all downvotes) is the selected title. In the case of a tie, each audience member will have the option to cast one tiebreaker vote on the titles that are tied for selection. In the unlikely event of a second tie, a random audience member will be selected to choose the movie from the titles tied for selection.
10. Refreshments: in addition to suggesting titles for a movie night event, users can also submit to the list of refreshments, so everyone can see what everyone else is bringing to the movie night.

# Apex Classes
1. MovieNightExtension - an extension of the standard "Movie Night" controller (for the custom Movie_Night__c object) and the primary controller for LMNOP
2. lmnopActivity - contains methods for logging LMNOP user activity in Salesforce and passing custom variable dimensions to Google Analytics
3. lmnopRegistrationController - a modified version of the Salesforce-provided "CommunitiesSelfRegController", handles new user registration
4. lmnopTest - code coverage for the above

# Apex Triggers
1. UserTrigger - generic trigger on User object, calls MovieNightExtension.updateContactWithUser(Trigger.new) after update to keep contact names synced with user names since both are referenced within LMNOP

# Visualforce Pages
1. lmnopTemplate - community composition template, used by all pages listed below
2. Login - community login page, configured as the "authorization required (401)" page when any private pages are accessed without authentication, includes links to register and reset forgotten passwords
3. Register - community self-registration page
4. RegistrationSuccessful - self-registration success page, lets users know to check their emial to continue
5. Profile - community profile management page, where users can update their name or time zone
6. MovieNight - home page, conditionally renders the "welcome" (disclaimer) message for new users, the details of a given movie night if an id parameter is passed, or the calendar of movie night events for the user otherwise
7. ManageMovieNight - allows users to update movie nights they are organizing (have created) if an id parameter is passed, otherwise will present the "new movie night" creation form
8. Refreshments - the "Refreshments" tab within a movie night reord detail page, separated for improved controls and analytics

# Custom Objects & Fields
1. Movie_Night__c - Main object for coordinating and tracking movie night events
    1. Countdown__c (formula text) - Displays the amount of time remaining until a movie is selected using the following formula: 
        IF(DATEVALUE(Showtime__c) - DATEVALUE(NOW()) > 1, TEXT(DATEVALUE(Showtime__c) - DATEVALUE(NOW())) + ' days left to choose a movie', 
        IF(DATEVALUE(Showtime__c) - DATEVALUE(NOW()) = 1, '1 day left to choose a movie', 
        IF(FLOOR((Showtime__c - NOW()) * 24) > 1, TEXT(FLOOR((Showtime__c - NOW()) * 24)) + ' hours left to choose a movie', 
        IF(FLOOR((Showtime__c - NOW()) * 24) = 1, '1 hour left to choose a movie', 
        IF(FLOOR((Showtime__c - NOW()) * 24 * 60) > 1, TEXT(FLOOR((Showtime__c - NOW()) * 24 * 60)) + ' minutes left to choose a movie', 
        IF(FLOOR((Showtime__c - NOW()) * 24 * 60) = 1, '1 minute left to choose a movie', 
        IF(FLOOR((Showtime__c - NOW()) * 24 * 60 * 60) > 1, TEXT(FLOOR((Showtime__c - NOW()) * 24 * 60 * 60)) + ' seconds left to choose a movie', 
        IF(FLOOR((Showtime__c - NOW()) * 24 * 60 * 60) = 1, '1 second left to choose a movie', 
        IF(ISPICKVAL(Tiebreaker__c, 'True') && FLOOR((Showtime__c - NOW()) * 24 * 60 + 5) > 1, TEXT(FLOOR((Showtime__c - NOW()) * 24 * 60 + 5)) + ' minutes left to choose a movie', 
        IF(ISPICKVAL(Tiebreaker__c, 'True') && FLOOR((Showtime__c - NOW()) * 24 * 60 + 5) = 1, '1 minute left to choose a movie', 
        IF(ISPICKVAL(Tiebreaker__c, 'True') && FLOOR(((Showtime__c - NOW()) * 24 * 60 + 5) * 60) > 1, TEXT(FLOOR(((Showtime__c - NOW()) * 24 * 60 + 5) * 60)) + ' seconds left to choose a movie', 
        IF(ISPICKVAL(Tiebreaker__c, 'True') && FLOOR(((Showtime__c - NOW()) * 24 * 60 + 5) * 60) = 1, '1 second left to choose a movie', 
        ''))))))))))
    2. Location__c (text, 255) - The event location for hosting a movie night
    3. Movie_Title__c (text, 255) - Displays the selected movie suggestion
    4. Organizer_Email__c (formula text) - Contains the email address of the movie night organizer using the following formula:
     CreatedBy.Email
    5. Showtime__c (date/time) - The event date/time, used for the calendar and to determine when voting is over
    6. Tie__c (picklist) - Includes the following values: "False" (default), "True" (if there is a tie), "Final" (if there is a second tie)
    7. Unregistered_Audience__C (long text area) - Lists email addresses for audience members who have been invited to a movie night, but not yet registered
2. Movie_Audience__c - Junction object between Movie Nights and Contacts
    1. Attending__c (checkbox) - Indicates if the invited audience contact will be attending the movie night
    2. Contact__c (master-detail)
    3. Movie_Night__c (master-detail)
    4. Random_Number__c (formula, number) - Assigns a random number to each audience member for final tiebreaker vote assignment using the following formula:
        VALUE(RIGHT(TEXT(SQRT((VALUE((LEFT(RIGHT(
        TEXT(CreatedDate),6),2)) & 
        TEXT(DAY(DATEVALUE(CreatedDate))) & 
        TEXT(MONTH(DATEVALUE(CreatedDate))) & 
        TEXT(YEAR(DATEVALUE(CreatedDate))) & 
        (LEFT(RIGHT(TEXT(CreatedDate),9),2)))) * 
        (VALUE((LEFT(RIGHT(
        TEXT(Contact__r.CreatedDate),6),2)) & 
        TEXT(DAY(DATEVALUE(Contact__r.CreatedDate))) & 
        TEXT(MONTH(DATEVALUE(Contact__r.CreatedDate))) & 
        TEXT(YEAR(DATEVALUE(Contact__r.CreatedDate))) & 
        (LEFT(RIGHT(
        TEXT(Contact__r.CreatedDate),9),2))))
        /10000)),3))
3. Movie_Suggestion__c - Child of the Movie Night object for tracking movies suggested per event
    1. IMDB_Id__c (text, 255) - The ID of the movie defined by IMDB, used to check for duplicate suggestions and to link to IMDB page
    2. Movie_Night__c (master-detail)
    3. Plot__c (text, 255) - A short summary of the movie plot per OMDb
    4. Poster__c (text, 255) - A link to the movie poster per OMDb
    5. Rated__c (text, 32) - The MPAA rating of the movie per OMDb
    6. Runtime__c (text, 16) - The length of the movie in minutes per OMDb
    7. Year__c (text, 4) - The year the movie was released per OMDb
    8. Upvotes__c (rollup summary) - Sums all upvotes from Movie_Vote__c
    9. Downvotes__c (rollup summary) - Sums all downvotes from Movie_Vote__c
    10. Vote_Score__c (formula, number) - Subtracts all downvotes from all upvotes
    11. Tiebreaker_Votes__c (rollup summary) - Sums all tiebreaker votes from Movie_Vote__c
    12. Final_Votes__c (rollup summary) - Sums all final votes from Movie_Vote__c
4. Refreshment__c - Child of the Movie Night object for tracking food and drinks per event
    1. Movie_Night__c (master-detail)
5. User - standard user object
    1. lmnop_Disclaimer_Acknowledged__c - Records the date/time when the user acknowledged the LMNOP community disclaimer
6. Activity__c - Used to track site activity
    1. Contact__c (lookup)
    2. IP_Address__c (text, 16) - The IP address of the site user
    3. Query__c (text, 255) - The query used when searching for movie titles
    4. Referer__c (long text area) - The contents of the "referer" page header (tracks link clicks)
    5. URI__c (long text area) - The universal resource indicator (URI) contents from the page header (the full site path after the host name)
    6. User__c (lookup)
    7. User_Agent__c (long text area) - The contents of the "user agent" page header (browser/navigator information)
7. Movie_Vote__c - Junction object between Movie Suggestions and Contacts
    1. Contact__c (master-detail)
    2. Movie_Suggestion__c (master-detail)
    3. Type (picklist) - Includes the following values: "Upvote", "Downvote", "Tiebreaker", "Final"

# Custom Settings & Fields
NOTE: in order to create new custom settings of type "List", you must enable "Manage List Custom Settings Type". This option is found under "Data", then "Schema Settings" within the Salesforce setup page.
1. API_Tokens__c (list) - Stores API tokens for use within apex code
    1. Token__c (text, 255) - The API key/token to be used
Records: 
1. Create an API token with the name "OMDb", and put your API token in the new Token__c field. You can obtain an OMDb API key from http://www.omdbapi.com/
2. Create an API token with the name "Google_Analytics", and put your tracking ID in the Token__c field. While not exactly an API, lmnop will look here to integrate with your Google Analytics account, if used. 

NOTE: if using Google Analytics, you can configure custom "dimensions" to collect additional information from LMNOP. The following dimensions can be collected (in this order:)
1. User ID - gets the user ID using the Visualforce global variable $User.Id
2. IP Address - gets the IP address using the lmnopActivity.gaIP getter
3. Title Search - gets the user query when searching for movies using the Visualforce global variable $CurrentPage.parameters.titlesearch

# Static Resources
NOTE: all static resources listed below should be set to "Public"
1. jslmnop - JS 
2. lmnop - CSS
3. Countdown - Background image for countdown timer
4. Popcorn - PNG image for refreshments icon since FontAwesome free doesn't provide one (found on pixabay)
5. PosterNotFound - PNG image to be displayed if a poster is not found when searching OMDb
6. MovieBorderBottom - Bottom border grid for LMNOP movie frames
7. MovieBorderTop - Top border grid for LMNOP movie frames
8. MovieTheater - Background image for LMNOP community, taken from https://commons.wikimedia.org/wiki/File:Sala_de_cine.jpg

# Other Setup
1. Remote Site Settings: add http://omdbapi.com