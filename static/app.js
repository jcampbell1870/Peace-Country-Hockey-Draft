* {
  box-sizing: border-box;
}

:root {
  --bg: #041d2a;
  --panel: #0f2c3d;
  --panel-alt: #173c4d;
  --card: #0d2438;
  --card-strong: #123549;
  --text: #edf7ff;
  --muted: #b7d5e4;
  --accent: #24c7a6;
  --accent-dark: #1aa383;
  --warning: #f2d36b;
  --danger: #ff8e80;
  --border: rgba(255, 255, 255, 0.1);
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(180deg, #021722 0%, #0a2335 100%);
  color: var(--text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 18px 40px;
}

.topbar {
  border-bottom: 1px solid var(--border);
  background: rgba(9, 27, 33, 0.8);
  backdrop-filter: blur(8px);
}

.topbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 18px;
  padding-bottom: 18px;
}

.eyebrow {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  font-size: 0.72rem;
  color: var(--warning);
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(2rem, 3vw, 3rem);
}

.hero {
  display: grid;
  grid-template-columns: 2.3fr 1fr;
  gap: 20px;
  padding: 28px 0 18px;
  align-items: stretch;
}

.badge {
  display: inline-block;
  padding: 8px 12px;
  background: rgba(36, 199, 166, 0.12);
  border: 1px solid rgba(36, 199, 166, 0.5);
  border-radius: 999px;
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.04rem;
  margin-bottom: 12px;
}

.hero h2 {
  font-size: clamp(2rem, 3vw, 3rem);
  margin-bottom: 12px;
}

.hero p {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 0;
}

.hero-panel,
.card {
  background: rgba(14, 39, 51, 0.84);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(2, 7, 14, 0.24);
}

.hero-panel {
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-label {
  margin: 0 0 6px;
  color: var(--muted);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
}

.stat-value {
  margin: 0 0 16px;
  font-size: clamp(1.7rem, 2.2vw, 2.7rem);
  font-weight: 700;
  color: var(--warning);
}

.card {
  padding: 24px 20px;
  margin-top: 22px;
}

.rules ul {
  margin: 0;
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.7;
}

.entry-form {
  display: block;
}

.personal-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

label {
  display: block;
  font-weight: 700;
  color: var(--muted);
}

input,
select {
  display: block;
  width: 100%;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  margin-top: 8px;
  font-size: 1rem;
}

.box-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.box-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
}

.box-card h4 {
  margin: 0 0 12px;
  color: var(--warning);
  font-size: 1.02rem;
}

.player-list {
  display: grid;
  gap: 10px;
}

.player-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
}

.player-option input {
  width: auto;
  margin: 0;
}

.player-label {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  color: var(--text);
  font-size: 0.92rem;
}

.player-label strong {
  font-weight: 700;
}

.player-label span {
  color: var(--muted);
}

.button {
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-size: 0.98rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button-primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  color: #041d2a;
}

.full-width {
  width: 100%;
}

.leaderboard-card {
  margin-bottom: 40px;
}

.leaderboard-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 18px;
}

.leaderboard-note {
  color: var(--muted);
  font-size: 0.85rem;
}

.leaderboard {
  display: grid;
  gap: 12px;
}

.leaderboard-row {
  display: grid;
  grid-template-columns: 50px 1.5fr 1fr 110px;
  gap: 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
}

.leaderboard-row .rank {
  font-weight: 700;
  color: var(--warning);
}

.leaderboard-row .name {
  font-weight: 700;
}

.leaderboard-row .email,
.leaderboard-row .points {
  color: var(--muted);
}

.notification {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(36, 199, 166, 0.1);
  color: var(--text);
}

.notification.error {
  background: rgba(255, 142, 128, 0.12);
  border-color: rgba(255, 142, 128, 0.3);
  color: #ffd8d3;
}

@media (max-width: 800px) {
  .hero,
  .personal-fields,
  .leaderboard-row {
    grid-template-columns: 1fr;
  }

  .topbar .container,
  .leaderboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
