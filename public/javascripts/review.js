document.addEventListener("DOMContentLoaded", (event) => {

    const editButton = document.getElementById("reviews_edit_button");

    editButton.addEventListener("click", (e) => {
        e.preventDefault();

        const editDiv = document.createElement("div");
        editDiv.classList.add("review-edit-container")
        const editTextArea = document.createElement("textarea");
        editTextArea.classList.add("review-edit-text-area")
        const confirmButton = document.createElement("button");
        confirmButton.classList.add("confirm-button", "btn");

        editDiv.appendChild(editTextArea);
        editDiv.appendChild(confirmButton);

        confirmButton.addEventListener("click", e => {
            e.preventDefault();

            const reviewId = document.getElementById("reviewIdForReviewEdit").value;
            const reviewContent = document.getElementById("review-content").value;

            editReview(reviewId, reviewContent);
        });
    });

    async function editReview(reviewId, review) {
         data = {};
         data.reviewId = reviewId;
         data.review = review;
        // console.log(data);
        await fetch(`/reviews/${reviewId}/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
});
