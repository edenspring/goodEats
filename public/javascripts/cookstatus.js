document.addEventListener("DOMContentLoaded", async (event)=>{
  const statusButton = document.querySelector('.recipes__status_submit');
  const currentStatus = document.querySelector('#cookStatus')
  const userId = document.querySelector('#userIdForStatus').value;
  const recipeId = document.querySelector('#recipeIdForStatus').value;

  const ping = await fetch(`/status/${recipeId}`)

  if (ping.ok){
    const pong = await ping.json()
    document.querySelectorAll('option').forEach((e) => {
      if (e.value === pong.status) e.selected = true;
    })
  }

  statusButton.addEventListener('click', async (e)=>{
    e.preventDefault();
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

  const res = await fetch(`/status`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const newData = await res.json()
  return newData;

}
