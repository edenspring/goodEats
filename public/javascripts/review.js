document.addEventListener("DOMContentLoaded", (event) => {
  const editButton = document.getElementById("reviews_edit_button");
  const writeButton = document.querySelector(".reviews__button");
  const deleteButton = document.querySelector(".reviews__delete");

  if (editButton) {
    writeButton.classList.add("hidden");
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      writeButton.classList.remove("hidden");
    })
    editButton.addEventListener("click", (e) => {
      e.preventDefault();
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
      editButton.classList.add("hidden");

      confirmButton.addEventListener("click", (e) => {
        e.preventDefault();

        const reviewId = document.getElementById("reviewIdForReviewEdit").value;
        const reviewContent = editTextArea.value;

        editReview(reviewId, reviewContent);
        const reviewsDiv = editButton.closest(".reviews");
        reviewsDiv.firstChild.children[1].innerHTML = reviewContent;
        editDiv.remove();
        editButton.classList.remove("hidden");
      });
    });
  };

  async function editReview(reviewId, review) {
    data = {};
    data.reviewId = reviewId;
    data.review = review;
    await fetch(`/reviews/${reviewId}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
});
