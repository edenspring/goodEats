document.addEventListener("DOMContentLoaded", (event) => {
    const likeButton = document.querySelector(".recipe-like-btn");
    likeButton.addEventListener("click", (event) => {
        event.preventDefault();

        const recipeId = document.getElementById("recipeIdForLike").value;

        likeRecipe(recipeId);

        let likeCount = parseInt(likeButton.innerText);
        likeCount++;
        likeButton.innerText = `${likeCount} NomNoms`;
    });
});

async function likeRecipe(recipeId) {
    const data = {};
    data.recipeId = recipeId;
    await fetch(`/recipes/${recipeId}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
};
