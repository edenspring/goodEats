document.addEventListener("DOMContentLoaded", (event)=>{
  const statusButton = document.querySelector('.recipes__cookedStatus');
  statusButton.addEventListener('click', async (e)=>{
    e.preventDefault();
    console.log('CLICKYCLACK')
    const userId = document.querySelector('#userIdForStatus').value;
    const recipeId = document.querySelector('#recipeIdForStatus').value;
    const cookStatus = document.querySelector('#cookStatus').value;
    console.log(userId, recipeId, cookStatus);
    const update = await updateStatus(recipeId, userId, cookStatus);
    return update;
  })

})

async function updateStatus(recipeId, userId, cookStatus){
  const data = {};
  data.recipeId = recipeId;
  data.userId = userId;
  data.cookStatus = cookStatus;
  return await fetch(`/status`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

}
