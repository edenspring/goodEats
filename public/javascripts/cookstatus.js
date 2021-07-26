document.addEventListener("DOMContentLoaded", (event)=>{
  const statusButton = document.querySelector('.recipes__status_submit');
  statusButton.addEventListener('click', async (e)=>{
    e.preventDefault();
    const userId = document.querySelector('#userIdForStatus').value;
    const recipeId = document.querySelector('#recipeIdForStatus').value;
    const cookStatus = document.querySelector('#cookStatus').value;
    const update = await updateStatus(recipeId, userId, cookStatus);
    return update;
  })

})

async function updateStatus(recipeId, userId, cookStatus){
  const data = {};
  data.recipeId = recipeId;
  data.userId = userId;
  data.cookStatus = cookStatus;
  console.log(data)

  const res = await fetch(`/status`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const newData = await res.json()
  console.log(newData)
  return newData;

}
