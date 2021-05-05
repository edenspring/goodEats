window.addEventListener("load", (event)=>{
  const reviewButton = document.querySelector('.review__button');
  reviewButton.addEventListener('click', (e)=>{
    const reviewForm = document.querySelector('.reviews__form');
    if (reviewForm.style.display === "none"){
      reviewForm.style.display = "block";
      reviewButton.innerText = 'Cancel writing review'
    } else {
      reviewForm.style.display = "none";
      reviewButton.innerText = 'Write a review'
    }
  })
})
