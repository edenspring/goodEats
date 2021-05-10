document.addEventListener("DOMContentLoaded", (event) => {
  const editButton = document.getElementById("reviews_edit_button");

  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("a new thing");
    const editDiv = document.createElement("div");
    editDiv.classList.add("review-edit-container");
    const editTextArea = document.createElement("textarea");
    editTextArea.classList.add("review-edit-text-area");
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button", "btn");
    confirmButton.innerHTML = "Confirm Changes";

    editDiv.appendChild(editTextArea);
    editDiv.appendChild(confirmButton);

    editButton.parentElement.appendChild(editDiv);

    confirmButton.addEventListener("click", (e) => {
      e.preventDefault();

      const reviewId = document.getElementById("reviewIdForReviewEdit").value;
      const reviewContent = editTextArea.value;

      editReview(reviewId, reviewContent);
      const reviewsDiv = editButton.closest(".reviews");
      console.log(reviewsDiv);
      reviewsDiv.firstChild.children[1].innerHTML = reviewContent;
      editDiv.remove();
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
});
