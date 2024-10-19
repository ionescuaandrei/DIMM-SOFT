const userId = localStorage.getItem('echipaId');  // 'echipaId' is the key used when saving the id

if (userId) {
  getUserProfile(userId);
} else {
  console.error('No user ID found in localStorage');
  alert('No user ID found. Please register the team first.');
}

document.getElementById('seeMapBtn').addEventListener('click', function() {
  window.location.href = "../../home.html"; 
});

document.getElementById('updateStatusBtn').addEventListener('click', function() {
  alert('Status updated!'); // Implement actual status update logic here
});

document.getElementById('seeAlertBtn').addEventListener('click', function() {
  alert('Alert seen!'); // Implement alert logic here
});

async function getUserProfile(userId) {
  try {
      const response = await fetch(`https://serverdimm.onrender.com/get/${userId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch profile data.');
      }
      const data = await response.json();

      // Update the UI with the fetched data
      document.getElementById('nume').textContent = data.nume;
      document.getElementById('team').textContent = `Team: ${data.team}`;
      document.getElementById('latitudine').textContent = `Latitude: ${data.latitudine}`;
      document.getElementById('longitudine').textContent = `Longitude: ${data.longitudine}`;
      document.getElementById('datacreare').textContent = `Creation Date: ${data.datacreare}`;
      document.getElementById('dataultimuluiUpdate').textContent = `Last Update: ${data.dataultimuluiUpdate}`;
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the profile data.');
  }
}


