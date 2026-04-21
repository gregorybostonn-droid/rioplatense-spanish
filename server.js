const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const VOCAB_PATH = path.join(__dirname, 'vocab.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/state', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(VOCAB_PATH, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read vocab.json' });
  }
});

app.post('/api/progress', (req, res) => {
  try {
    const current = JSON.parse(fs.readFileSync(VOCAB_PATH, 'utf8'));
    const updated = { ...current, ...req.body };
    fs.writeFileSync(VOCAB_PATH, JSON.stringify(updated, null, 2));
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

app.listen(PORT, () => {
  console.log(`Rioplatense app running at http://localhost:${PORT}`);
});
