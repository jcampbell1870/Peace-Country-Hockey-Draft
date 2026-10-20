const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ENTRIES_PATH = path.join(DATA_DIR, 'entries.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

const PRIZE_INFO = {
  entryFee: 20,
  firstPrizeCash: 1000,
  prizeSummary: '1st Place: $1,000 cash',
};

const PAYMENT_CONFIG = {
  stripePaymentLink: process.env.STRIPE_PAYMENT_LINK || '',
  stripePosNote:
    process.env.STRIPE_POS_NOTE ||
    'Set STRIPE_PAYMENT_LINK to your Stripe payment link or POS instructions for entrants.',
};

const BOXES = [
  {
    id: 'box-1',
    label: 'Box 1',
    players: [
      { id: 'p-1', name: 'Connor McDavid', team: 'EDM', points: 92 },
      { id: 'p-2', name: 'Leon Draisaitl', team: 'EDM', points: 88 },
      { id: 'p-3', name: 'Nathan MacKinnon', team: 'COL', points: 86 },
      { id: 'p-4', name: 'Auston Matthews', team: 'TOR', points: 84 },
      { id: 'p-5', name: 'David Pastrnak', team: 'BOS', points: 83 },
    ],
  },
  {
    id: 'box-2',
    label: 'Box 2',
    players: [
      { id: 'p-6', name: 'Jack Eichel', team: 'VGK', points: 81 },
      { id: 'p-7', name: 'Mitchell Marner', team: 'TOR', points: 80 },
      { id: 'p-8', name: 'Mikko Rantanen', team: 'COL', points: 79 },
      { id: 'p-9', name: 'Sam Reinhart', team: 'FLA', points: 77 },
      { id: 'p-10', name: 'Brad Marchand', team: 'BOS', points: 75 },
    ],
  },
  {
    id: 'box-3',
    label: 'Box 3',
    players: [
      { id: 'p-11', name: 'Alex Ovechkin', team: 'WSH', points: 74 },
      { id: 'p-12', name: 'Patrick Kane', team: 'DET', points: 72 },
      { id: 'p-13', name: 'Tage Thompson', team: 'BUF', points: 70 },
      { id: 'p-14', name: 'Kyle Connor', team: 'WPG', points: 69 },
      { id: 'p-15', name: 'Steven Stamkos', team: 'TBL', points: 68 },
    ],
  },
  {
    id: 'box-4',
    label: 'Box 4',
    players: [
      { id: 'p-16', name: 'Matthew Tkachuk', team: 'FLA', points: 67 },
      { id: 'p-17', name: 'Nikita Kucherov', team: 'TBL', points: 66 },
      { id: 'p-18', name: 'John Tavares', team: 'TOR', points: 64 },
      { id: 'p-19', name: 'Zach Hyman', team: 'EDM', points: 63 },
      { id: 'p-20', name: 'Bryan Rust', team: 'PIT', points: 61 },
    ],
  },
  {
    id: 'box-5',
    label: 'Box 5',
    players: [
      { id: 'p-21', name: 'Jake Guentzel', team: 'TBL', points: 60 },
      { id: 'p-22', name: 'Andrei Svechnikov', team: 'CAR', points: 59 },
      { id: 'p-23', name: 'Adrian Kempe', team: 'LAK', points: 58 },
      { id: 'p-24', name: 'Trevor Zegras', team: 'ANA', points: 57 },
      { id: 'p-25', name: 'Jeff Skinner', team: 'BUF', points: 56 },
    ],
  },
  {
    id: 'box-6',
    label: 'Box 6',
    players: [
      { id: 'p-26', name: 'Cale Makar', team: 'COL', points: 95 },
      { id: 'p-27', name: 'Roman Josi', team: 'NSH', points: 90 },
      { id: 'p-28', name: 'Victor Hedman', team: 'TBL', points: 88 },
      { id: 'p-29', name: 'Adam Fox', team: 'NYR', points: 86 },
      { id: 'p-30', name: 'Rasmus Dahlin', team: 'BUF', points: 84 },
    ],
  },
  {
    id: 'box-7',
    label: 'Box 7',
    players: [
      { id: 'p-31', name: 'Erik Karlsson', team: 'SJS', points: 82 },
      { id: 'p-32', name: 'Miro Heiskanen', team: 'DAL', points: 79 },
      { id: 'p-33', name: 'Charlie McAvoy', team: 'BOS', points: 76 },
      { id: 'p-34', name: 'Dougie Hamilton', team: 'NJD', points: 75 },
      { id: 'p-35', name: 'Aaron Ekblad', team: 'FLA', points: 73 },
    ],
  },
  {
    id: 'box-8',
    label: 'Box 8',
    players: [
      { id: 'p-36', name: 'Alex Pietrangelo', team: 'VGK', points: 72 },
      { id: 'p-37', name: 'Josh Morrissey', team: 'WPG', points: 70 },
      { id: 'p-38', name: 'Moritz Seider', team: 'DET', points: 68 },
      { id: 'p-39', name: 'Darnell Nurse', team: 'EDM', points: 66 },
      { id: 'p-40', name: 'Brent Burns', team: 'CAR', points: 64 },
    ],
  },
  {
    id: 'box-9',
    label: 'Box 9',
    players: [
      { id: 'p-41', name: 'Igor Shesterkin', team: 'NYR', points: 93 },
      { id: 'p-42', name: 'Andrei Vasilevskiy', team: 'TBL', points: 89 },
      { id: 'p-43', name: 'Ilya Sorokin', team: 'NYI', points: 85 },
      { id: 'p-44', name: 'Juuse Saros', team: 'NSH', points: 83 },
      { id: 'p-45', name: 'Connor Hellebuyck', team: 'WPG', points: 81 },
    ],
  },
  {
    id: 'box-10',
    label: 'Box 10',
    players: [
      { id: 'p-46', name: 'Semyon Varlamov', team: 'COL', points: 78 },
      { id: 'p-47', name: 'Jacob Markstrom', team: 'CGY', points: 76 },
      { id: 'p-48', name: 'Darcy Kuemper', team: 'WAS', points: 74 },
      { id: 'p-49', name: 'Tristan Jarry', team: 'PIT', points: 72 },
      { id: 'p-50', name: 'Filip Gustavsson', team: 'MIN', points: 71 },
    ],
  },
  {
    id: 'box-11',
    label: 'Box 11',
    players: [
      { id: 'p-51', name: 'Mika Zibanejad', team: 'NYR', points: 70 },
      { id: 'p-52', name: 'Anze Kopitar', team: 'LAK', points: 68 },
      { id: 'p-53', name: 'Elias Pettersson', team: 'VAN', points: 66 },
      { id: 'p-54', name: 'Joe Pavelski', team: 'DAL', points: 65 },
      { id: 'p-55', name: 'Tyler Bertuzzi', team: 'CHI', points: 63 },
    ],
  },
  {
    id: 'box-12',
    label: 'Box 12',
    players: [
      { id: 'p-56', name: 'Rasmus Andersson', team: 'CGY', points: 62 },
      { id: 'p-57', name: 'Morgan Rielly', team: 'TOR', points: 61 },
      { id: 'p-58', name: 'Noah Dobson', team: 'NYI', points: 60 },
      { id: 'p-59', name: 'Cam Fowler', team: 'ANA', points: 59 },
      { id: 'p-60', name: 'Tony DeAngelo', team: 'CAR', points: 58 },
    ],
  },
  {
    id: 'box-13',
    label: 'Box 13',
    players: [
      { id: 'p-61', name: 'Elias Lindholm', team: 'CGY', points: 57 },
      { id: 'p-62', name: 'Max Pacioretty', team: 'WSH', points: 55 },
      { id: 'p-63', name: 'J.T. Miller', team: 'VAN', points: 54 },
      { id: 'p-64', name: 'Pavel Buchnevich', team: 'STL', points: 52 },
      { id: 'p-65', name: 'Anthony Duclair', team: 'TBL', points: 51 },
    ],
  },
  {
    id: 'box-14',
    label: 'Box 14',
    players: [
      { id: 'p-66', name: 'Seth Jarvis', team: 'CAR', points: 50 },
      { id: 'p-67', name: 'Cole Perfetti', team: 'WPG', points: 49 },
      { id: 'p-68', name: 'Matt Boldy', team: 'MIN', points: 48 },
      { id: 'p-69', name: 'Jordan Kyrou', team: 'STL', points: 47 },
      { id: 'p-70', name: 'Alex DeBrincat', team: 'DET', points: 46 },
    ],
  },
  {
    id: 'box-15',
    label: 'Box 15',
    players: [
      { id: 'p-71', name: 'Jesper Bratt', team: 'NJD', points: 45 },
      { id: 'p-72', name: 'Valeri Nichushkin', team: 'COL', points: 44 },
      { id: 'p-73', name: 'Brady Tkachuk', team: 'OTT', points: 43 },
      { id: 'p-74', name: 'Troy Terry', team: 'ANA', points: 42 },
      { id: 'p-75', name: 'Dylan Cozens', team: 'BUF', points: 41 },
    ],
  },
  {
    id: 'box-16',
    label: 'Box 16',
    players: [
      { id: 'p-76', name: 'Jakub Voracek', team: 'CAR', points: 40 },
      { id: 'p-77', name: 'Martin Necas', team: 'CAR', points: 39 },
      { id: 'p-78', name: 'Kasperi Kapanen', team: 'EDM', points: 38 },
      { id: 'p-79', name: 'John Carlson', team: 'WSH', points: 37 },
      { id: 'p-80', name: 'Brandon Montour', team: 'FLA', points: 36 },
    ],
  },
  {
    id: 'box-17',
    label: 'Box 17',
    players: [
      { id: 'p-81', name: 'Mikhail Sergachev', team: 'TBL', points: 35 },
      { id: 'p-82', name: 'Nico Hischier', team: 'NJD', points: 34 },
      { id: 'p-83', name: 'Nick Suzuki', team: 'MTL', points: 33 },
      { id: 'p-84', name: 'Patrik Laine', team: 'CBJ', points: 32 },
      { id: 'p-85', name: 'Jaden Schwartz', team: 'SEA', points: 31 },
    ],
  },
  {
    id: 'box-18',
    label: 'Box 18',
    players: [
      { id: 'p-86', name: 'Ryan Nugent-Hopkins', team: 'EDM', points: 30 },
      { id: 'p-87', name: 'Pius Suter', team: 'DET', points: 29 },
      { id: 'p-88', name: 'Jared McCann', team: 'SEA', points: 28 },
      { id: 'p-89', name: 'Oliver Ekman-Larsson', team: 'FLA', points: 28 },
      { id: 'p-90', name: 'Sam Bennett', team: 'OTT', points: 27 },
    ],
  },
  {
    id: 'box-19',
    label: 'Box 19',
    players: [
      { id: 'p-91', name: 'Jonathan Marchessault', team: 'VGK', points: 26 },
      { id: 'p-92', name: 'Tyson Foerster', team: 'PHI', points: 25 },
      { id: 'p-93', name: 'Ryan OReilly', team: 'TOR', points: 24 },
      { id: 'p-94', name: 'Matt Duchene', team: 'DAL', points: 23 },
      { id: 'p-95', name: 'Dylan Strome', team: 'WSH', points: 22 },
    ],
  },
  {
    id: 'box-20',
    label: 'Box 20',
    players: [
      { id: 'p-96', name: 'T.J. Oshie', team: 'WSH', points: 21 },
      { id: 'p-97', name: 'Pat Maroon', team: 'TBL', points: 20 },
      { id: 'p-98', name: 'Phil Kessel', team: 'VGK', points: 19 },
      { id: 'p-99', name: 'Nikolaj Ehlers', team: 'WPG', points: 18 },
      { id: 'p-100', name: 'Vladimir Tarasenko', team: 'OTT', points: 17 },
    ],
  },
];

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(ENTRIES_PATH)) {
    fs.writeFileSync(ENTRIES_PATH, JSON.stringify([], null, 2));
  }
}

function loadEntries() {
  ensureDataFile();
  const raw = fs.readFileSync(ENTRIES_PATH, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function saveEntries(entries) {
  ensureDataFile();
  fs.writeFileSync(ENTRIES_PATH, JSON.stringify(entries, null, 2));
}

function allPlayers() {
  return BOXES.flatMap((box) => box.players);
}

function playerById(playerId) {
  return allPlayers().find((player) => player.id === playerId) || null;
}

function getPlayerPoints(player) {
  const asNumber = Number(player?.points || 0);
  return Number.isFinite(asNumber) ? asNumber : 0;
}

function buildLeaderboard(entries) {
  return entries
    .map((entry) => {
      const total = entry.selections.reduce((sum, playerId) => {
        const player = playerById(playerId);
        return sum + getPlayerPoints(player);
      }, 0);

      return {
        name: entry.name,
        email: entry.email,
        createdAt: entry.createdAt,
        total,
        selections: entry.selections,
      };
    })
    .sort((a, b) => b.total - a.total);
}

function weeklyRefreshTrigger() {
  const now = new Date();
  const estNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const isMonday = estNow.getDay() === 1;
  const isSevenPm = estNow.getHours() === 19 && estNow.getMinutes() === 0;

  return isMonday && isSevenPm;
}

function applyWeeklyPointBoost() {
  const players = allPlayers();
  players.forEach((player) => {
    const bump = Math.floor(Math.random() * 8) + 2;
    player.points = Math.max(0, (player.points || 0) + bump);
  });
}

let lastRefreshStamp = null;
setInterval(() => {
  const shouldRefresh = weeklyRefreshTrigger();
  const now = Date.now();

  if (shouldRefresh && (!lastRefreshStamp || now - lastRefreshStamp > 60 * 1000)) {
    lastRefreshStamp = now;
    applyWeeklyPointBoost();
  }
}, 60 * 1000);

function jsonResponse(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(payload));
}

function serveStaticFile(req, res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentTypeMap = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.ico': 'image/x-icon',
    };

    res.writeHead(200, {
      'Content-Type': contentTypeMap[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/api/boxes') {
    jsonResponse(res, 200, { boxes: BOXES, prizeInfo: PRIZE_INFO, payment: PAYMENT_CONFIG });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/leaderboard') {
    const entries = loadEntries();
    jsonResponse(res, 200, { leaderboard: buildLeaderboard(entries) });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/config') {
    jsonResponse(res, 200, { prizeInfo: PRIZE_INFO, payment: PAYMENT_CONFIG });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/entry') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { name, email, selections } = payload;

        if (!name || !email || !Array.isArray(selections) || selections.length !== 20) {
          jsonResponse(res, 400, { error: 'Please provide your name, email, and exactly 20 selections.' });
          return;
        }

        const validSelections = selections.filter((value) => typeof value === 'string' && value.trim().length > 0);
        if (validSelections.length !== 20) {
          jsonResponse(res, 400, { error: 'Each of the 20 boxes must have one player selected.' });
          return;
        }

        const selectedPlayerIds = new Set();
        for (const playerId of validSelections) {
          if (selectedPlayerIds.has(playerId)) {
            jsonResponse(res, 400, { error: 'Each player selection must be unique across the 20 boxes.' });
            return;
          }
          selectedPlayerIds.add(playerId);
        }

        const entries = loadEntries();
        entries.push({
          id: `entry-${Date.now()}`,
          name: String(name).trim(),
          email: String(email).trim(),
          selections: validSelections,
          createdAt: new Date().toISOString(),
        });

        saveEntries(entries);
        jsonResponse(res, 201, { message: 'Draft entry created successfully.', leaderboard: buildLeaderboard(entries) });
      } catch (error) {
        jsonResponse(res, 400, { error: 'Malformed request body.' });
      }
    });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/') {
    serveStaticFile(req, res, path.join(PUBLIC_DIR, 'index.html'));
    return;
  }

  const requestedFile = path.join(PUBLIC_DIR, url.pathname.replace(/^\//, ''));
  if (requestedFile.startsWith(PUBLIC_DIR)) {
    serveStaticFile(req, res, requestedFile);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Page not found');
});

server.listen(PORT, () => {
  console.log(`Peace Country Hockey Draft app is running at http://localhost:${PORT}`);
  console.log('Weekly point updates are scheduled for Monday at 7:00 PM Eastern Time.');
});
