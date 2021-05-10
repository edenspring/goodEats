"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Instructions", [
      {
        specification: "Crack eggs into bowl, beat well",
        listOrder: 1,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Pour mixture into cold pan, add butter",
        listOrder: 2,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Gently cook over medium heat, stirring well",
        listOrder: 3,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "When eggs have formed up to desired consistency, remove from heat and serve",
        listOrder: 4,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Lightly spread mayonaise on one side of both pieces of bread",
        listOrder: 1,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Place one piece of mayo'd bread mayo side down into pan heated over medium heat",
        listOrder: 2,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Place cheese and other slice of bread on top of bread in pan, mayo side up",
        listOrder: 3,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once bread begins to crisp and cheese begins to melt, flip to other side",
        listOrder: 4,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Continue cooking until cheese is completely melted and other side is crisp",
        listOrder: 5,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Remove from pan, cut in half and serve",
        listOrder: 6,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "First prepare your brine solution by adding the bay leaves and 1/2 cup kosher salt to 6 cups water",
        listOrder: 1,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Next remove the neck and other giblets from the chicken",
        listOrder: 2,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Place the chicken in the brine solution and allow it to rest for at least 30 minutes but up to an hour",
        listOrder: 3,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "While the chicken brines, prepare the other spices by mixing together in a bowl",
        listOrder: 4,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "After the rub is created, get your grill heated to a medium heat with two zones for cooking: a hot zone where the charcoal burns and a cool zone where the chicken will cook. Place a grill-safe pan beneath the cool zone to catch any drippings",
        listOrder: 5,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Rub the entire chicken with the vegetable oil. Be sure to get oil inside the cavity of the bird as well as both on top of and underneath the skin",
        listOrder: 6,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Aggressively apply the spice rub to all areas of the bird. Make sure to get the inside and outside of the skin touching as much of the meat with the rub as possible",
        listOrder: 7,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Open the can of beer as normal, then use a can opener to get the top cleanly off. Drink or pour out half of the beer",
        listOrder: 8,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Place the chicken on top of the open can of beer that it can stand on its own",
        listOrder: 9,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "On your pre-heated grill place the chicken over the cool side and let sit with the breast side facing the direction of the coals",
        listOrder: 10,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Be sure to rotate the chicken every 30-45 minutes to ensure even cooking, once the temperature of the meat reads at least 160 the chicken can be removed from the grill",
        listOrder: 11,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once chicken is removed from grill tent with foil and give time to rest",
        listOrder: 12,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "After resting for at least 15 minutes (rest up to 35 minutes if time permites), carve and serve",
        listOrder: 13,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Start by cutting your vegetables, for the eggplant cut 1/2\" rounds. Cut the zucchini/summer squash lengthwise and cut the onion into 1/2\" rings",
        listOrder: 1,
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Create a brine using 1/4cup salt to 4-5 cups water and place the eggplant in to soak",
        listOrder: 2,
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Coat the zucchini/squash and onion with vegetable oil and lightly salt, then drizzle some of the vinegar on top",
        listOrder: 3,
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "While the eggplant brines, get your grill heated to around medium maybe medium-high heat",
        listOrder: 4,
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once the grill is good and hot, remove the eggplant from the brine and pat dry with paper towels, then rub with oil, lightly salt and drizzle with vinegar",
        listOrder: 5,
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Grill all veggies for a couple minutes on each side, taking care not to burn but ensuring a good cook throughout. The onion will take the longest to cook through but burn the quickest, try to find a cooler spot on the grill for it to cook on",
        listOrder: 6,
        recipeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Begin by cutting open your dried guajillo peppers and removing the seeds",
        listOrder: 1,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Next, toast the guajillos in a small pan (add some of the removed seeds for extra spice!)",
        listOrder: 2,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once the peppers become fragrant, add enough water to the pan to cover",
        listOrder: 3,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once the water begins to boil, turn off the heat and let peppers steam/steep/soak for about 10 minutes",
        listOrder: 4,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "After giving your peppers the time they need, add them to your preferred blender/food processor with some of the steeping water",
        listOrder: 5,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Add all of your spices and salt(go easy!), the garlic, the lime juice, apple cider vinegar, vegetable oil and the rough chopped cilantro with stems and blend/process until smooth",
        listOrder: 6,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once smooth, taste it! Trust your palate, if you need more salt, add it, if you need more garlic, add it! Make your adjustments and get your mix smooth again",
        listOrder: 7,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once you're happy with your marinade add it and your flank steaks to a large container, be sure to rub marinade all throughout the steaks covering the meat",
        listOrder: 8,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Give the meat at least 2 hours to marinate, up to 48",
        listOrder: 9,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "When you're ready to cook, get your grill HOT!",
        listOrder: 10,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Cook each steak about 3 minutes per side, then let rest at least 5 minutes before cutting",
        listOrder: 11,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "While steaks are cooling, gently cook some tortillas on the hot grill, watch them closely as they'll need maybe a bit more than a minute per side (depending on how hot your grill still is)",
        listOrder: 12,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once the steak is rested, large dice against the grain and serve with tortillas, onions, cilantro, hot sauce and toppings of choice!(we added avocado crema in the attached photo)",
        listOrder: 13,
        recipeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Instructions', null, {});
  },
};
