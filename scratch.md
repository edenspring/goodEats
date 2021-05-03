What features are needed to make this an application that people would use?

    * Books = Recipes
    * Bookshelves = Recipe Box(more personal than a book)
    * Reviews = Reviews(would show up under recipe)
    * Read Status(will read, have read) = Liked the recipe(maybe rated) or star/fave for later; difference between marking for later and applying some sort of rating/review
    somewhere in user profile would have a link to show which recipes you've reviewed or favorited/starred

    Recipes - prepopulated or user generated? Could start with a seed but also give users the option to create a new recipe;
            - need a Recipe model
                with attributes: ingredients:text, measurements:string.includes(),
                    dropdown for measurement types so that we can keep the measurements uniform;
                    a


    Recipe Box - something that holds a json object that could be the recipe box
            - could maybe be a table of rows of recipes?
            - table might have an array of foreign keys to iterate through to pull those recipes that
            - belong to the user's recipe box; will also need a foreign key to reference the user;
            - belongsTo(models.User...);
            - sequelize will probably take care of our objects and arrays;

            Use recipe box project as a template

We might need to use HTML AND Pug for this project; definitely need CSS

What features would be nice to have if the minimum viable product gets finished?

    * consider these as we go along so they're easy to implement if we have time
    *Bonus Features:
        - Search across multiple models - search by recipe or book; this would be a search bar thing.
        - Tags
        - Could do a sort by reviews, or relevant date(which they could change with button press; would be a new fetch to db), could order by stars
        - ajax in the background for infinite scrolling
        as it scrolls fetch older recipes; limit initial page to 15 results; once we hit X use ajax to fetch more; maybe an event listener
        - will probably need an :id sort of page to render different things here
        - landing page - with tags that are based off user's reviews and recipe box to suggest things they might like
        - might want to add a sort by feature for the reviews
        - rating system for each review


Will these features demonstrate everything we've learned during the first half of the course?

    - Be sure to use one advanced array method

Things we'll need

 - landing page with most recent recipes
 -

test
