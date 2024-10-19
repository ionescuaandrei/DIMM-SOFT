document.getElementById('teamForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the default way

  const nume = document.getElementById('nume').value;
  const echipa = document.getElementById('echipa').value;

  // Geolocation to get latitude and longitude
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Now, make the POST request with the form data and the geolocation
          sendFormData(nume, echipa, lat, lng);

      }, function(error) {
          showAlert("Unable to retrieve your location due to: " + error.message);
      });
  } else {
      showAlert("Geolocation is not supported by your browser.");
  }
});

function sendFormData(nume, echipa, latitude, longitude) {
  const data = {
      nume: nume,
      team: echipa, 
      latitudine: latitude, 
      longitudine: longitude, 
      mesajalerta: "Hello, I am here!" 
  }

  fetch('https://serverdimm.onrender.com/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if (data.message === "successfully") {
          // Salvează id-ul primit
          localStorage.setItem('echipaId', data.id); // Poți folosi localStorage sau sessionStorage

          showAlert('Echipa a fost creată cu succes!');
          console.log('Success:', data);

          // Redirect către pagina de profil
          window.location.href = "../DIMM-SOFT/app/html/pages/profile.html"; 
      } else {
          showAlert('Failed to create echipa: Unexpected response.');
      }
  })
  .catch(error => {
      showAlert('Failed to create echipa: ' + error.message);
      console.error('Error:', error);
  });
}


function showAlert(message) {
  const alertMessage = document.getElementById('alertMessage');
  alertMessage.textContent = message;
  alertMessage.style.display = 'block'; 
  setTimeout(function() {
      alertMessage.style.display = 'none'; 
  }, 5000);
}