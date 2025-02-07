# Fetch A Friend

______________

1. Authentication System
# Completed:
* Create a login screen where users enter their name and email.
* Send a POST request to /auth/login with the user’s credentials.
* Handle authentication cookies (fetch-access-token) for subsequent requests.

# Next Steps:
* Provide a logout button that sends a POST request to /auth/logout.

______________
2. Dog Search Page
* Fetch and display a list of available dogs.
* Use the /dogs/search endpoint to retrieve dog data.
* Ensure all fields of the Dog object (except id) are displayed.
* Fetch the list of breeds using GET /dogs/breeds.
* Allow users to filter search results by breed. 
* Implement pagination using the size and from query parameters in /dogs/search.
* Display next and previous buttons when applicable.

# Next Steps: 
* Sort results alphabetically by breed (default).
* Allow users to toggle sorting (ascending/descending).

______________
3. Dog Favorite Page
* Allow sorting by name or age as well.
* Allow users to "like" or "favorite" dogs.
* Store favorited dogs in context.

______________
4. Dog Match Page
* Users can use the match tab to generate a random dog

# Next Steps: 
* Provide a button for users to submit their favorited dog IDs to /dogs/match.
* Display the matched dog returned by the API.



![Image of Front-end](/src/assets/LoginPage.png)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
