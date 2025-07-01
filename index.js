const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/markpsukim', async (req, res) => {
  try {
    const response = await fetch('https://talmudfinder-2-0.loadbalancer.dicta.org.il/TalmudFinder/api/markpsukim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error in /markpsukim:', err);
    res.status(500).json({ error: 'Error fetching from Dicta (markpsukim)' });
  }
});

app.post('/parsetogroups', async (req, res) => {
  try {
    const response = await fetch('https://talmudfinder-2-0.loadbalancer.dicta.org.il/TalmudFinder/api/parsetogroups?smin=22&smax=10000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error in /parsetogroups:', err);
    res.status(500).json({ error: 'Error fetching from Dicta (parsetogroups)' });
  }
});

app.get('/', (req, res) => {
  res.send('Dicta Proxy is running');
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
