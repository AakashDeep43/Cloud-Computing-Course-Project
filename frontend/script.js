function getHistory() {
  fetch('https://vigorous-grizzled-thyme.glitch.me/history') // ✅ Updated
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('historyList');
      list.innerHTML = '';
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name + ' (' + new Date(item.searchedAt).toLocaleString() + ')';
        list.appendChild(li);
      });
    });
}

async function getWeather() {
  const city = document.getElementById('city').value;
  const apiKey = '1262b0bacba3469afbf3debf80273b8d'; // ✅ Your actual key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
      document.getElementById('result').innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>${data.weather[0].main}</p>
        <p>Temp: ${data.main.temp}°C</p>
      `;

      // ✅ Also send to backend for history logging
      await fetch('https://vigorous-grizzled-thyme.glitch.me/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: data.name })
      });

    } else {
      document.getElementById('result').innerText = 'City not found!';
    }
  } catch (error) {
    console.error('Fetch error:', error);
    document.getElementById('result').innerText = 'Error fetching data';
  }
}
