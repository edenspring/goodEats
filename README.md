<h1 align="center">
GoodEats
</h1>

![logo2](https://user-images.githubusercontent.com/76574880/121215581-c34f8800-c845-11eb-8379-c4493810c7c8.png)


<h2 align="center">
  A Goodreads clone and community that helps foodies find their favorite new foods.
</h2>

----------------

[Features](https://github.com/edenspring/goodEats/wiki/MVP-List)

**New account creation, log in, log out, guest/demo log in**

  * Users can sign up, log in, and log out.
  * Users can use a demo log in to try the site.
  * Users can't use certain features without logging in (like reviewing and rating recipes).
  * Logged in/out users are directed to a landing page which displays most recent recipes.

![Screen Shot 2021-06-06 at 5 10 50 PM](https://user-images.githubusercontent.com/76574880/121215296-7ff51980-c845-11eb-80a9-95bc1da9d7f1.png)

  
**Recipes**

  * Logged in users can post recipes.
  * Logged in users can edit and delete their own recipes.
  * All users can view a sampling of the most recent recipes.
  
**Recipe Box**

  * Logged in users can save recipes in their recipe box.
  * All users can view a sampling of the most recent recipe boxes.
  
**Reviews**

  * Logged in users can post reviews.
  * Logged in users can edit and delete their own reviews.
  * All users can view a sampling of the most recent reviews.
  
**Status**

  * Logged in users can choose whether they have made, will make, or are not interested in a recipe.

<img width="1425" alt="Screen Shot 2021-06-08 at 10 47 44 AM" src="https://user-images.githubusercontent.com/76574880/121218598-8042e400-c848-11eb-9334-4c3251ef16ae.png">

  
**Bonus Features**

  * Logged in users can write and edit reviews of recipes.
  * Logged in users can like a recipe several times.

--------------

[Database Schema](https://github.com/edenspring/goodEats/wiki/Database-Schema)

![goodEatsDBSchema](https://user-images.githubusercontent.com/76574880/117578698-27e7bd80-b0b5-11eb-83db-81fb62f3d372.png)


--------------

[API Routes](https://github.com/edenspring/goodEats/wiki/API-Routes)

**This webapp uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features**

**<h3> Front-end routes </h3>**

**Home**

  * A logged out user will be shown a short list of recipes and prompted to log in when they try to take actions that need authorization.

    - GET /api/

<img width="1226" alt="Screen Shot 2021-06-08 at 10 51 47 AM" src="https://user-images.githubusercontent.com/76574880/121218308-3c4fdf00-c848-11eb-8e95-37aa41c341a7.png">

    
  * A logged in user will be shown a larger list of recipes and be able to click on buttons that redirect them to specific actions or display requested       
      information.

    - GET /api/
    
**Log in**

  * A logged out user will be shown a form to enter their credentials to log in.
    - GET /api/login

**Registration**
  * An unregistered user can access a sign up page to create a new account.
    - GET /api/signup

<img width="856" alt="Screen Shot 2021-06-08 at 10 52 53 AM" src="https://user-images.githubusercontent.com/76574880/121218413-54276300-c848-11eb-9669-5b711d9c8e87.png">


**Profile**

  * A user will be able to view their information and make changes to certain details.
    - GET /api/users:id
    
**Recipes**

  * A logged out user will be prompted to either log in or register with the site, a demo user button will be shown to provide full functionality. Once 
      authenticated, a user will be shown a list of recipes and given options to choose from.
    - GET /api/recipes
    
  * A logged in user will be able to see specific recipes to view, review and add to their recipes boxes.
    - GET /api/recipes/:id to view recipes.
  
  * A logged in user will be able to create a new recipe using a form and see it added to the site's database
    - GET /api/recipes/create to render a form for recipe creation.
    - POST /api/recipes/create to create new recipe entity in the database.

  * A logged in user will be able to edit a recipe they created using a form on the site
    - PUT /api/recipes:id
    
**Recipe Boxes**

  * A logged in user will be shown a collection of their recipe boxes and a truncated list of recipe titles contained therein
    - GET /api/recipe-boxes

  * A logged in user will be able to view a specific recipe box with forms to remove recipes or edit information about their recipe boxes
    - GET /api/recipe-boxes/:id

**<h3> Back-end routes </h3>**

**Recipes**

  * A logged in user may delete one of their own recipes, removing it from the list of visible recipes without causing a refresh/redirect
    - DELETE /api/recipes/:id
  * A logged in user may create a recipe, adding it to the list of recipes available on the site
    - POST /api/recipes/
  * A logged in user may get recipes from the database, rending x(to be decided later) at a time, then retrieving and rendering more as the user scrolls down
    - GET /api/recipes
  * A logged in user may edit one of their own recipes, changing it inside the database
    - PUT /api/recipes/:id
    
**Reviews**

  * A logged in user may delete one of their own reviews, removing it from the list of visible reviews on a specific recipe without causing a refresh/redirect
    - DELETE /api/reviews/:id
  * A logged in user may write a review, adding it to the list of reviews for the given recipe
    - POST /api/reviews/
  * A logged in user will see reviews from the database for a particular recipe while they are viewing it
    - GET /api/reviews/:recipeid
  * A logged in user may edit one of their own reviews, changing it inside the database
    - PUT /api/reviews/:id
  
**Users**

  * A new user will be able to create their own user account, allowing them to log in and access more features
    - POST /api/users
  * A registered user will be able to log in to their account, gaining access to restricted features
    - (GET) /api/user:id?

<img width="1131" alt="Screen Shot 2021-06-08 at 10 54 08 AM" src="https://user-images.githubusercontent.com/76574880/121218474-61445200-c848-11eb-936d-453fbdf6b3ef.png">


-----------------------

[User Stories](https://github.com/edenspring/goodEats/wiki/User-Stories/_edit)

**Users**
  
  **Registration**
  

  * As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
      * When I'm on the /users/register page:
          - I would like to be able to enter my username, email, and preferred password on a clearly laid out form.
          - I would like the website to log me in upon successful completion of the sign-up form.
              - So that I can seamlessly access the site's functionality
      * When I enter invalid data on the sign-up form:
          - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
          - So that I can try again without needing to refill forms I entered valid data into.

  **Log in**

  * When I'm on the /users/login page:
      - I would like to be able to enter my username and password on a clearly laid out form.
  * I would like the website to log me in upon successful authentication.
      - Successful authentication occurs when my password hash matches the stored hash.
  * I would like to stay logged in when closing the page.
  * When I enter invalid data on the log-up form:
      - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
          - So that I can try again without needing to refill forms I entered valid data into.

  **Demo User**

  * I would like to have full access like a normal user without having to log in.
  * I would like to have an easy to see and access button to become a demo user.
      - So that I can test features and functionality without having to register.

  **Not logged in**

  * When trying to do things that require a registered user like creating or saving recipes
      - I would like to be redirected to the login page.

  **Log out**

  * I would like to have an easy to access button to log out.
      * When on any page and when logged in
        - Be redirected to the home page

**Recipes**

  **Create**
  
  * As a logged in user, I want to be able to post new recipes.
      * When I'm on the /recipes/new page:
          - I can write and submit a new recipe.
              - So that I can share my recipes and food memes with my friends.

  **View**
   
  * As a logged in or logged out user, I want to be able to view a selection of the most recent recipes.
      * When I'm on the / page:
          - I can view the ten most recently posted recipes.
              - So that I can read and review with the recipes of my friends.
  * As a logged in or logged out user, I want to be able to view a specific recipe and its associated reviews and likes.
      * When I'm on the /recipes/:id page:
          - I can view the ingredients and instructions of the recipe, as well as the associated reviews and likes.
              - So that I can read and review the recipes of my friends, and add my own reviews in the reviews section.


  **Updating**
  
  * As a logged in user, I want to be able to edit my recipes by clicking an Edit button associated with the recipe anywhere that recipe appears.
      * When I'm on the /recipes/:id page:
          - I can click "Edit" to make permanent changes to recipes I have posted.
              - So that I can fix any errors I make in my recipes.

  **Delete**
  
  * As a logged in user, I want to be able to delete my recipes by clicking a Delete button associated with the recipe anywhere that the recipe appears.
      * When I'm on the /recipes:id/edit page:
          - I can click "Delete" to permanently delete a recipe I have posted.
              - So that when I realize I shouldn't have shared my secret recipe, I can easily remove it.

**Reviews**
  
  **Create**

  * I would like to add my own reviews to recipes.
      - So other users can like or add to their recipe boxes.

  **Read**
  
  * As a logged in user, I want to be able to see what people think of recipes.
      - So I can like the recipe or add to my recipe boxes.

  **Edit/Delete**
    
  * I would like to be able to delete or edit my own reviews.
      - So that I can remove what I said or correct a mistake.

**Recipe Boxes**

  **Create**

  * I would like to have the ability to make multiple collections of recipes.
      - So that I can name them according to how I see fit.
  
  **Edit/Delete**
  
  * As a logged in user, I want to be able to add to, edit, and delete my recipe boxes.
      - I can add or remove recipes from a recipe box.
      - I can add or remove recipe boxes.

-------------

<h3> Technology Used </h3>

B-Crypt,
Sequelize,
Express,
Csurf,
Pug

<h3> Authentication </h3>

  * Users are authenticated before being authorized to perform particular actions like editing, deleting, and updating.

<h3> Developed By: </h3>

![Screen Shot 2021-06-06 at 5 45 38 PM](https://user-images.githubusercontent.com/76574880/121215467-a74be680-c845-11eb-89fe-b3bbc3c46fac.png)


