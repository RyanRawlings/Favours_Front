CONTENTS OF THIS FILE
---------------------
 * Introduction
 * Project Details
 * Requirements 
 * Installation
 * Requirement and Module Mapping
 * Module Breakdown
 * Configuration
 * Git Commenting
 * Group Members

# Introduction
Favours is a system that allows individuals to recieve rewards for completing favours for others, have
favours completed for them and has been designed for the sharing of IOUs with friends, social clubs and 
companies.

# Project Details
This is Frontend implementation of Favours. Using React Framework and Material UI for Component styling. 

The project is made up of 11 pages/views, and 13 component folders groupied by Feature.

The project makes use of the Material UI component library, to design highly engaging and interactive
components and features.

Navigation between pages is handled by react-router-dom. 

Where possible the project, relies on state management to handle page refresh. Most if not all 
useEffect hooks have been implemented with state dependencies, so that if React detects a state variable
change, the project will automatically re-fire API calls for specified data and or Business logic processing
and re-render components on screen, so to ensure for a more seamless user experience.

To ensure that the user recieves adequate messaging from the application, this project has implemented
react-toasify. It provides a light-weight toast message component to be displayed on screen with minimal 
configuration and maintainence required.

Where applicable code attribution has been provided in the files, linking the original source and if applicable the
original author

## Requirements
No special requirements

## Installation
Once downloaded, install node packages with:
npm install | npm i

## Requirement and Module Mapping
The following identifies the modules that handle the functionality requirements:  
  * Favor tracking:
    - src/views/ManageFavours
  
  * Favors
    - src/views/ManageFavours
  
  * Requests
    - src/views/PublicRequest
  
  * Core Features: 
    * Website has a front page
        - src/views/Home
        - src/views/PublicRequest

    * Anonymous users can browse the list of available requests, and 
      search by keywords or by rewards:
        - searchBar
        - src/views/PublicRequest

    * Live Leaderboard
        - src/views/Leaderboard

    * New users can create a new account to sign up
        - UserAPI
        - src/views/Signup

    * Users can log in and are able to:
        - View favours they other people (and see proof)
            - src/views/ManageFavours
            - ImageAPI -> (to upload proof)
            
        - View the favours they are owed (and see proof)
            - src/views/ManageFavours
            - ImageAPI -> (to upload proof)
            
        - Record a new Favour (with fixed list of choices)
            - src/views/ManageFavours
            - FavourAPI -> (getFavourTypes)
            - ImageAPI -> (to upload proof)

        - Record a favour as having being Repayed
            - src/views/ManageFavours
            - favourModal -> handleRepayFavour
            - ImageAPI -> (to upload proof)

        - Create a new request that will appear on the the "front page" and specify reward
            - ManageFavours
            - publicRequests -> src/components/publicRequests/newPublicRequestForm

        - Add to or remove from rewards on existing requests (the request should be deleted if no rewards)
            - Adding rewards -> (src/components/rewards/NewRewardForm | src/components/rewards/index)
            - Delete request when reward count === 0 -> favourModal (useEffect)

        - Complete a request and claim the favors by uploading an image as proof
            - View Public Request -> src/components/favourModal
            - Complete and Claim favours -> src/components/claimModal

        - Show limited number of items for long lists
            - src/components/pagination/index

    * Party Detection:
        - src/components/partyDetection/index

## Module Breakdown
   * Home:
       - Landing page, shows a hero image and separate buttons leading to Public Requests and Sign up page

   * Leaderboard:
       - Displays live leaderboard of top users, contains a refresh button that will alter a state variable
         triggering a re-render.

   * ManageFavours
       - Where the core functionality sits for Favors and Favor tracking:
            - Create new Favours
            - Create new Public Requests
            - Repay Favours
            - Delete Favours
            - Forgive Favours
        
   * MultiRepay
       - Where users can repay more than one credit Favor at a time
            - MultiRepay page, where the user selects the Favours they want to repay
            - RepaySelectedFavours page, where the user can upload an image for the Favours selected to bulk
              repay

   * Profile
       - Where the user can track and view the activities they have undertaken within the system, and how long ago
         it they were performed
       - Displays the personal information about the users account.
       - Allows users to upload a profile image.

   * Settings
       - Way for the user to see the details of the groups they are a part of, and the other users within those groups

## Configuration
This project has no modifiable settings. There is no configuration, once the user has created an account
their account will remain unchanged.

## Git Commenting
Git comments should utilise an imperative mood in the subject line
i.e. (Please) -> Add styling to the Favour widget

## Group Members
* Student Name | Student Number
* Rezo Ahmed | 13747199
* Wei Fu | 13161447
* Arsedian Ivanurrahman | 12464691
* Ryan Rawlings | 13524552