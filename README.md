# AssignmentPhaseOne
### This project is the assessment for the Assignment Phase One.

## Install instructions
1. Open git bash on your local machine
2. navigate to location you wish to install the repo
3. clone this repo using 'git clone <url>'
  
## Run instructions (Angular Front-end)
1. Open command prompt or powershell
2. navigate to cloned repo and open the /assignment directory
3. run the application using 'ng serve --open'

## Run instructions (Node.js server)
1. Open command prompt or powershell
2. navigate to cloned repo and open the /assignment/server directory
3. run the server.js using 'node server.js' or 'npx nodemon server.js'

## Run instructions (server testing)
1. Open command prompt or powershell
2. navigate to cloned repo and open the /assignment/server directory
3. run the test script using 'npm run-script test'

## Run instructions (Angular Unit testing)
1. Open command prompt or powershell
2. navigate to cloned repo and open the /assignment directory
3. run the test script using 'npm run-script test'

## Run instructions (E2E testing)
1. Open command prompt or powershell
2. navigate to cloned repo and open the /assignment directory
3. run the test script using 'ng e2e'

## User Accounts
### Super Admin: super  admin
### Group Admin: axela  abc123
### User: bobby1  abc123

# Documentation

## GIT

Git was used throughout the entire development of the application. The assignment folder contains the entire project and is pushed directly up do github from the master branch on my PC. No branches were made because the development was procedural, meaning development of a new feature was not commenced until another feature was finished. This was simple because there is only one author of the system, using only a single computer. If this were a group assignment, I would have used branches, and will use them for each ongoing phase of the assignment, however for the 1st phase, I did not see the benefits.

Regarding commits, as mentioned before, the system was built procedurally, hence, each commit typically to a component and its files, the server file and a route. Since the majority of the features are located on the home page, the home html and ts files were updated with each new feature implementation. A new server javascript file was added with each feature to read and write relevant data from storage (server/data directory). This new file is directed through the server.js file with include statements.

Using this process, it was easy to determine when to commit changes and push them to a remote repository. See figure 1 for a PrintScreen of the git log in the git bash terminal (bottom of the doc).

## Data Structures

There are 3 collections in the MongoDB which make up the storage aspect of the application. These collections are:

### users

This collection contains an array storing the login details of each user. This is array contains a document for each user storing their username and password. This is the collection used for authentication.

### userData

This collection contains an array storing all the other user information, this was separated from the users collection because the password is never accessed once a user has logged in. It is also an array of documents like the users collection. This collection is accessed once the user has logged in to retrieve their role so different permission levels can be assigned to different users. It also stores this email address which currently is not being utilised.

### groups

This collection is currently the most accessed collection in the database, it stores all the information regarding the groups and channels of the system. It is comprised of an array of documents, each representing a single group. Within the document, you will find the groupName, members, and channels. The groupName is a string, the members attribute is an array of users, the channels attribute is an array which stores all the information about the channels in a nested document. In this array you will find nested documents which withhold the channelName, channel members, and channel messages. The channel members is an array of users, while the channel messages is an array of messages describing who sent the message and what the message was.

## REST API

The REST API was used for communication between the Angular front-end and the Node.js server. The Angular front-end utilised port 4200 while the Node.js listened at port 3000 awaiting any requests sent to that port. All the posts sent to the server were redirected to their respective javascript file from the server.js file. All the files are directed to the routes directory in the server.js file. These routes are:

### /api/auth

This route will be redirected to the postLogin.js file. It is responsible for user authentication when a user attempts to login using the login form.

Parameters:

- Object containing two string:
  - Username
  - Password

Returns:

- Object containing 4 variables:
  - Username
  - Role
  - User ID

The postLogin.js file will check the username and password which were passed through in the parameters against the users in the users.json file. If the username and password match, additional user information is fetched from the userData.json file for the relevant user and the information will be sent back to the front-end. If the username and password do not match, nothing is sent back to the front-end.

### /addUser

This route will be redirected to the addUser.js file. It is responsible for checking validity of new user variables and storing new users in storage when created.

Parameters:

- Object containing 5 strings
  - NewUsername
  - NewEmail
  - NewPassword
  - NewPassword2
  - NewRole

Returns:

- An error message (null if not applicable)

The addUser.js checks the variables passed through the parameters for validity, if all variables are valid, a new user object is written to the users.json and userData.json files.

### /findUsers

This route will be redirected to the findUsers.js file. It is responsible for fetching all the users from storage (used to list users which can be deleted.)

Parameters:

- None

Returns:

- usersArray
  - Contains the username of each user

The findUsers.js reads the users.json file and writes all usernames to an array which is sent back to the angular front-end.

### /delUser

This route will be redirected to the delUser.js file. It is responsible for deleting users.

Parameters:

- User id (index of usersArray above)

Returns:

- usersArray

This file reads the users.json file and splices the specified user from the array using the user id given. The same is done for the userData.json file. The array with the user removed is returned to the front-end

### /findGroups

This route will be redirected to the findGroups.js file. It is responsible for finding the groups for each logged in user.

Parameters:

- Username
- Role

Returns:

- userGroups array storing applicable groups

This file reads the groups.json file and checks which groups the user is a member of. If they are a member of that group, that group will be pushed to the userGroups array. If their role is Super Admin (SA) or Group Admin (GA), all groups will be pushed to the array. This array is returned to the front-end.

### /findChannel

This route will be redirected to the findChannel.js file. It is responsible for finding the channels for each user in a specific group.

Parameters:

- Username
- Group
- Role

Returns:

- Channels array storing applicable channels.

This file reads the groups.json file and finds all the channels which a user belongs to. Applicable channels will be added to the channels array. If the user&#39;s role is Super Admin (SA) or Group Admin (GA), all channels will be pushed to the array. This array is returned to the front-end.

### /deleteGroup

This route will be redirected to the deleteGroup.js file. It is responsible for deleting groups.

Parameters:

- Group name

Returns:

- Boolean

This file reads the groups.json file and finds the index of the group name specified in the parameter. Once the index is found, the groups is spliced from the array and the array is overwritten to the groups.json file. Returns true when it is overwritten.

### /deleteChannel

This route will be redirected to the deleteChannel.js file. It is responsible for deleting channels within a group.

Parameters:

- Group name
- Channel name

Returns:

- Boolean

This file reads the groups.json file and finds the index of the group specified in the parameter. With this index, the channels within that group are searched for the channel with matching name. Once these indexes are known, the channel is spliced from the group&#39;s &#39;channels&#39; object. This is the overwritten to the groups.json file. Returns true when it is overwritten.

### /renameGroup

This route will be redirected to the renameGroup.js file. It is responsible for overwriting a groupName .

Parameters:

- New Group name
- Old Group name

Returns:

- Boolean

This file reads the groups.json file and finds the group with the specified group using the old group name. If it is found, the new group name overwrites the old name if it passes validity checks. This renames a specific group and is written back to the groups.json file. Returns true once overwritten, if anything fails, returns false.

### /upgradeUser

This route will be redirected to the upgradeUser.js file. It is responsible for upgrading a user to super admin.

Parameters:

- ID

Returns:

- Boolean

This file reads the userData.json file and finds the user with the given index (ID). Once the user is found, their role is overwritten to SA. This is then written back to the userData.json file. Returns true once overwritten, otherwise returns false.

### /findInvite

This route will be redirected to the findInvite.js file. It is responsible for finding users to invite to a specific group.

Parameters:

- inviteGroup

Returns:

- newUsers Array

This file will read the groups.json file and find the group with the specified group name (inviteGroup). Once found, the users.json file is read to find the names of all users. If a name does NOT exists in both the users array and the groups.members array, the user is added to the newUsers array. Once all the users are checked, the newUsers array is sent back to the front-end

### /sendGroupInvite

This route will be redirected to the sendGroupInvite.js file. It is responsible for added a specific user to a group.

Parameters:

- Username
- Invite Group

Returns:

- Boolean

This file will read the groups.json file and find the group index of the specified group (invite group). Once found, the new user is added the its member&#39;s array. This is then rewritten to the groups.json file. Returns true if successful.

###


### /deleteFromGroup

This route will be redirected to the deleteFromGroup.js file. It is responsible for finding users which exist in a group so they can potentially be deleted.

Parameters:

- Group name
- Username of current user in local storage

Returns:

- Array containing the group&#39;s members

This file will read the groups.json file and find the group which matches the specified group (group name). Once found, the members are found and if the current user is part of the group, their name is removed from the members array (prevents users from deleting themselves). This array is returned to the front-end.

### /sendDeleteFromGroup

This route will be redirected to the sendDeleteGroup.js file. It is responsible for deleting users from a group.

Parameters:

- Username
- Group name

Returns:

- Boolean

This file will read the groups.json file. It will find the group using the groupName. The user index will be found in this group using the specified username. Once the user is found in the group&#39;s members array, they will be deleted from the group. Then they are removed from any channels which they may be a part of within this group. Once their name is spliced from arrays in both group and channel, it is written back to the groups.json file. Returns true once overwritten.

### /deleteFromChannel

This route redirects to the deleteFromChannel.json file. It is responsible for finding users in a specific channel which can be deleted.

Parameters:

- Channel name
- Group name
- Username (of current user in local storage)

Returns:

- usersArray

This file will read the groups.json file. It will find the specific group using the group name. When found, the channel within this group is found using the channel name. The members within this channel are saved to the userArray unless they are the currently logged in user (username). This array is returned to the front-end.

### /sendDeleteFromChannel

This route redirects to the sendDeleteFromChannel.js file. It is responsible for deleting a user from a specific channel.

Parameters:

- Channel name
- Group name
- Username

Returns:

- Boolean

This file will read the groups.json file. It will find the relevant group and channel within said group. The members of this channel are found then the user with the specified username is deleted from this object. This new members object with the user deleted is rewritten to the groups.json file. Returns true once data is overwritten.

## Angular Architecture

The system is comprised of 4 components. These are:

### App Component

This standard component of angular architecture handles importing modules to be used throughout the project. The html page has some standard information such as a title and the logout button. These elements are thus accessible from any page within the system.

### Login Component

This component is home to the login form and the functions to make it work. The html page is a basic form which uses the information entered to authorise users. If a user is already logged in and tried to access this component, they will be redirected to the home page.

### Home Component

This component houses the bulk of the system. This may be subdivided once there are more components to reduce clutter. All the routes mentioned in the REST API part of the documentation, stem from this component. Users can only access this page once they have successfully logged in. This is because the component requires user information to display anything since there is very little static content.

### Chat Component

This component contains the chat aspect of the system. Once the user has selected a group and channel to join, they will be redirected to its appropriate chat room. This contains a counter displaying how many users are in the room, a noticeboard displaying the most recent activity in the room, and a dialogue screen allowing conversations between users. All messages sent in each room is stored in the database and fetched when the room is re-joined.

The system also utilises 3 services. These include:

### Img-upload Service

This service is used to communicate with the server regarding image uploading. Consists of only 1 method, imgUpload().

### Shared-data Service

Used for an observable to pass information from the Home Component to the Chat Component without passing it through the URL to prevent unauthorised access to chat rooms.

### Socket Service

Service to handle requests and responses for the sockets used in the chat component. This service will emit to the server certain requests, and respond to calls from the servers using the socket.on method.