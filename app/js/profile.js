const userId = localStorage.getItem('echipaId');  // 'echipaId' is the key used when saving the id

if (userId) {
  getUserProfile(userId);
}

document.getElementById('seeMapBtn').addEventListener('click', function() {
  window.location.href = "../../home.html"; 
});

document.getElementById('updateStatusBtn').addEventListener('click', function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          
          // Call the update function with new lat and lng
          updateUserLocation(userId, newLat, newLng);
      }, function(error) {
          
      });
  } else {
      alert("Geolocation is not supported by your browser.");
  }
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
  }
}

// Function to update user's latitude and longitude
async function updateUserLocation(userId, latitudine, longitudine) {
  try {
      const response = await fetch(`https://serverdimm.onrender.com/update/${userId}`, {
          method: 'PUT', // or 'PATCH' depending on your API
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ latitudine, longitudine })
      });

      if (!response.ok) {
          throw new Error('Failed to update user location.');
      }

      const data = await response.json();
      
      
      
      getUserProfile(userId);

  } catch (error) {
      console.error('Error:', error);
      
  }
}
