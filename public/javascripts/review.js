document.addEventListener("DOMContentLoaded", (event) => {

    const editButton = document.getElementById("reviews_edit_button");

    editButton.addEventListener("click", (e) => {
        e.preventDefault();

        const reviewId = document.getElementById("reviewIdForReviewEdit").value;
        const reviewContent = document.getElementById("review-content").value;

        editDiv = document.createElement("div");
        editTextArea = document.createElement("textarea");
        confirmButton = document.createElement("button");

        editDiv.appendChild()




    });
    editReview(reviewId, reviewContent);

    //make fetch request and update dom with new content; manipulate dom to change from old review to new review
//send actual content of the review that's getting edited.
    async function editReview(reviewId, review) {
         data = {};
         data.reviewId = reviewId;
         data.review = review;
        console.log(data);
        await fetch(`/reviews/${reviewId}/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
});
