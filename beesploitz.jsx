import { useState, useEffect, useCallback } from "react";

// ─── Supabase Client (inline, no npm) ───────────────────────────────────────
// NOTE: Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = "https://biclegpilbvnejvkyjri.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY2xlZ3BpbGJ2bmVqdmt5anJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NTYyODgsImV4cCI6MjA5NTUzMjI4OH0.bUC-0T8qtoeOVtJAFd7gk6Z-Wz2fsYoSCbdT0g-uYjs";

async function supaFetch(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": opts.prefer || "return=representation",
      ...opts.headers,
    },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1509271237925273632/EASXQjE-GmHzdJxk6pP5bydrliyCwmpJYDTKpr8t9I2VPGF4W-jPEvgg2EafGUugehKd";

async function sendDiscordLog(username, gmail, role) {
  const now = new Date().toLocaleString();
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🐝 New Beesploitz Account Created",
        color: 0xFFD700,
        fields: [
          { name: "Username", value: username, inline: true },
          { name: "Gmail", value: gmail, inline: true },
          { name: "Role", value: role, inline: true },
          { name: "Account Made", value: now, inline: false },
        ],
        thumbnail: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Honeybee_closeup.jpg/320px-Honeybee_closeup.jpg" },
      }]
    })
  }).catch(() => {});
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bee-yellow: #FFD700;
  --bee-amber: #FFA500;
  --bee-dark: #0a0a00;
  --bee-stripe1: #0d0d00;
  --bee-stripe2: #1a1500;
  --bee-panel: #111100;
  --bee-border: #FFD70033;
  --bee-border-bright: #FFD70066;
  --bee-text: #FFE44D;
  --bee-muted: #998800;
  --bee-success: #88FF44;
  --bee-danger: #FF4444;
  --bee-info: #44AAFF;
  --font-main: 'Orbitron', monospace;
  --font-mono: 'Share Tech Mono', monospace;
}

body {
  background: var(--bee-dark);
  color: var(--bee-text);
  font-family: var(--font-mono);
  min-height: 100vh;
}

/* Stripe background */
.stripe-bg {
  background: repeating-linear-gradient(
    45deg,
    var(--bee-stripe1) 0px,
    var(--bee-stripe1) 18px,
    var(--bee-stripe2) 18px,
    var(--bee-stripe2) 36px
  );
  min-height: 100vh;
}

/* Login page */
.login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background: #0d0d00ee;
  border: 1.5px solid var(--bee-border-bright);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 400px;
  max-width: 95vw;
  box-shadow: 0 0 40px #FFD70022;
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    135deg,
    transparent 0,
    transparent 20px,
    #FFD70006 20px,
    #FFD70006 40px
  );
  pointer-events: none;
}

.bee-logo {
  text-align: center;
  margin-bottom: 1.5rem;
}

.bee-logo img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--bee-yellow);
  object-fit: cover;
  display: block;
  margin: 0 auto 0.75rem;
}

.bee-logo h1 {
  font-family: var(--font-main);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--bee-yellow);
  letter-spacing: 4px;
  text-transform: uppercase;
}

.bee-logo p {
  font-size: 0.7rem;
  color: var(--bee-muted);
  letter-spacing: 3px;
  margin-top: 2px;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  font-size: 0.65rem;
  color: var(--bee-muted);
  letter-spacing: 2px;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.field input {
  width: 100%;
  background: #1a1500;
  border: 1px solid var(--bee-border-bright);
  color: var(--bee-text);
  padding: 0.55rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus {
  border-color: var(--bee-yellow);
  box-shadow: 0 0 8px #FFD70033;
}

.btn {
  width: 100%;
  padding: 0.65rem;
  background: var(--bee-yellow);
  color: #000;
  font-family: var(--font-main);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-top: 0.5rem;
}

.btn:hover { background: var(--bee-amber); }
.btn:active { transform: scale(0.98); }

.btn-sm {
  width: auto;
  padding: 0.3rem 0.75rem;
  font-size: 0.7rem;
  letter-spacing: 1px;
  margin-top: 0;
}

.btn-danger {
  background: var(--bee-danger);
  color: #fff;
}
.btn-danger:hover { background: #cc3333; }

.btn-ghost {
  background: transparent;
  border: 1px solid var(--bee-border-bright);
  color: var(--bee-text);
}
.btn-ghost:hover { background: #FFD70011; }

.switch-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.75rem;
  color: var(--bee-muted);
}

.switch-link button {
  background: none;
  border: none;
  color: var(--bee-yellow);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-decoration: underline;
}

.err { color: var(--bee-danger); font-size: 0.75rem; margin-top: 0.5rem; text-align: center; }
.ok  { color: var(--bee-success); font-size: 0.75rem; margin-top: 0.5rem; text-align: center; }

/* Dashboard */
.dash {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  background: #080800;
  border-right: 1px solid var(--bee-border);
  padding: 1rem 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  text-align: center;
  padding: 0 1rem 1rem;
  border-bottom: 1px solid var(--bee-border);
  margin-bottom: 0.5rem;
}

.sidebar-logo span {
  font-family: var(--font-main);
  font-size: 1rem;
  font-weight: 900;
  color: var(--bee-yellow);
  letter-spacing: 2px;
}

.nav-item {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-left: 3px solid transparent;
  color: var(--bee-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 1px;
  padding: 0.55rem 1rem;
  cursor: pointer;
  transition: all 0.15s;
  text-transform: uppercase;
}

.nav-item:hover { color: var(--bee-yellow); background: #FFD70008; }
.nav-item.active {
  color: var(--bee-yellow);
  border-left-color: var(--bee-yellow);
  background: #FFD70011;
}

.sidebar-footer {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid var(--bee-border);
  font-size: 0.65rem;
  color: var(--bee-muted);
}

.main {
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--bee-border);
  padding-bottom: 0.75rem;
}

.topbar h2 {
  font-family: var(--font-main);
  font-size: 1.1rem;
  color: var(--bee-yellow);
  letter-spacing: 3px;
}

.badge {
  font-size: 0.6rem;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.badge-owner { background: #FFD70033; color: var(--bee-yellow); border: 1px solid var(--bee-yellow); }
.badge-admin { background: #FF880033; color: #FF8800; border: 1px solid #FF8800; }
.badge-user  { background: #44AAFF22; color: var(--bee-info); border: 1px solid var(--bee-info); }
.badge-active { background: #88FF4422; color: var(--bee-success); border: 1px solid var(--bee-success); }
.badge-used { background: #FF444422; color: var(--bee-danger); border: 1px solid var(--bee-danger); }

/* Stat cards */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--bee-panel);
  border: 1px solid var(--bee-border-bright);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.stat-card .num {
  font-family: var(--font-main);
  font-size: 2rem;
  font-weight: 900;
  color: var(--bee-yellow);
}

.stat-card .lbl {
  font-size: 0.6rem;
  color: var(--bee-muted);
  letter-spacing: 2px;
  margin-top: 2px;
  text-transform: uppercase;
}

/* Panel */
.panel {
  background: var(--bee-panel);
  border: 1px solid var(--bee-border);
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.panel h3 {
  font-family: var(--font-main);
  font-size: 0.8rem;
  color: var(--bee-yellow);
  letter-spacing: 2px;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

/* Form row */
.form-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.form-row .field { flex: 1; min-width: 120px; margin-bottom: 0; }

/* Table */
.bee-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}

.bee-table th {
  text-align: left;
  font-size: 0.6rem;
  letter-spacing: 2px;
  color: var(--bee-muted);
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid var(--bee-border);
  text-transform: uppercase;
}

.bee-table td {
  padding: 0.5rem 0.6rem;
  border-bottom: 1px solid var(--bee-border);
  color: var(--bee-text);
  font-family: var(--font-mono);
}

.bee-table tr:hover td { background: #FFD70006; }

/* Key display */
.key-code {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  background: #1a1500;
  border: 1px solid var(--bee-border);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--bee-yellow);
}

/* Game card */
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.game-card {
  background: #1a1500;
  border: 1px solid var(--bee-border-bright);
  border-radius: 10px;
  overflow: hidden;
}

.game-card .game-thumb {
  width: 100%;
  height: 120px;
  background: repeating-linear-gradient(45deg, #1a1500, #1a1500 8px, #2a2000 8px, #2a2000 16px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.game-card .game-info {
  padding: 0.75rem;
}

.game-card .game-name {
  font-family: var(--font-main);
  font-size: 0.75rem;
  color: var(--bee-yellow);
  margin-bottom: 0.25rem;
}

.game-card .game-meta {
  font-size: 0.65rem;
  color: var(--bee-muted);
}

/* Input with button */
.input-btn {
  display: flex;
  gap: 0.5rem;
}
.input-btn input { flex: 1; }
.input-btn .btn { flex-shrink: 0; }

.loading { color: var(--bee-muted); font-size: 0.8rem; padding: 1rem 0; }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function genKey() {
  const seg = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BEE-${seg()}-${seg()}-${seg()}`;
}

// ─── Auth / Session ───────────────────────────────────────────────────────────
function useSession() {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bz_session") || "null"); } catch { return null; }
  });

  const login = useCallback((user) => {
    localStorage.setItem("bz_session", JSON.stringify(user));
    setSession(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bz_session");
    setSession(null);
  }, []);

  return { session, login, logout };
}

// ─── Login / Register ─────────────────────────────────────────────────────────
function AuthPage({ login }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "", gmail: "", invite_key: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleLogin(e) {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      const rows = await supaFetch(`/users?username=eq.${encodeURIComponent(form.username)}&select=*`);
      if (!rows.length) { setMsg({ err: "User not found." }); setLoading(false); return; }
      const user = rows[0];
      if (user.password !== form.password) { setMsg({ err: "Wrong password." }); setLoading(false); return; }
      if (user.blacklisted) { setMsg({ err: "Your account has been blacklisted." }); setLoading(false); return; }
      await supaFetch(`/users?id=eq.${user.id}`, { method: "PATCH", body: JSON.stringify({ last_login: new Date().toISOString() }) });
      login(user);
    } catch (err) { setMsg({ err: err.message }); }
    setLoading(false);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      if (!form.username || !form.password || !form.gmail || !form.invite_key)
        throw new Error("All fields required.");
      if (!form.gmail.includes("@gmail.com"))
        throw new Error("Must use a Gmail address.");

      // Check invite key
      const keys = await supaFetch(`/invite_keys?key=eq.${encodeURIComponent(form.invite_key)}&select=*`);
      if (!keys.length) throw new Error("Invalid invite key.");
      const inv = keys[0];
      if (inv.status !== "active") throw new Error("Invite key already used.");

      // Check username taken
      const existing = await supaFetch(`/users?username=eq.${encodeURIComponent(form.username)}&select=id`);
      if (existing.length) throw new Error("Username already taken.");

      // Create user
      const [newUser] = await supaFetch("/users", {
        method: "POST",
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          gmail: form.gmail,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          blacklisted: false,
        })
      });

      // Mark key as used
      await supaFetch(`/invite_keys?id=eq.${inv.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "used", used_by: form.username, used_at: new Date().toISOString() })
      });

      // Discord log
      await sendDiscordLog(form.username, form.gmail, "user");

      login(newUser);
    } catch (err) { setMsg({ err: err.message }); }
    setLoading(false);
  }

  return (
    <div className="stripe-bg login-wrap">
      <div className="login-card">
        <div className="bee-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Honeybee_closeup.jpg/320px-Honeybee_closeup.jpg"
            alt="Bee"
            onError={e => { e.target.style.display = "none"; }}
          />
          <h1>Beesploitz</h1>
          <p>{mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}</p>
        </div>

        <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
          <div className="field">
            <label>Username</label>
            <input value={form.username} onChange={e => set("username", e.target.value)} placeholder="your_username" autoComplete="username" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="••••••••" />
          </div>
          {mode === "register" && <>
            <div className="field">
              <label>Gmail</label>
              <input type="email" value={form.gmail} onChange={e => set("gmail", e.target.value)} placeholder="you@gmail.com" />
            </div>
            <div className="field">
              <label>Invite Key</label>
              <input value={form.invite_key} onChange={e => set("invite_key", e.target.value)} placeholder="BEE-XXXX-XXXX-XXXX" />
            </div>
          </>}
          {msg?.err && <p className="err">{msg.err}</p>}
          {msg?.ok  && <p className="ok">{msg.ok}</p>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "LOADING..." : mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="switch-link">
          {mode === "login"
            ? <><span>Don't have an account? </span><button onClick={() => { setMode("register"); setMsg(null); }}>Use an invite key</button></>
            : <><span>Already have an account? </span><button onClick={() => { setMode("login"); setMsg(null); }}>Sign in</button></>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function Overview() {
  const [stats, setStats] = useState({ users: 0, keys: 0, admins: 0, blacklisted: 0, games: 0 });
  useEffect(() => {
    (async () => {
      try {
        const [users, keys, games] = await Promise.all([
          supaFetch("/users?select=role,blacklisted"),
          supaFetch("/invite_keys?select=status"),
          supaFetch("/backdoored_games?select=id"),
        ]);
        setStats({
          users: users.length,
          keys: keys.filter(k => k.status === "active").length,
          admins: users.filter(u => u.role === "admin" || u.role === "owner").length,
          blacklisted: users.filter(u => u.blacklisted).length,
          games: games.length,
        });
      } catch {}
    })();
  }, []);

  return (
    <div>
      <div className="stat-grid">
        {[
          ["Total Users", stats.users],
          ["Active Keys", stats.keys],
          ["Admins", stats.admins],
          ["Blacklisted", stats.blacklisted],
          ["Backdoored Games", stats.games],
        ].map(([lbl, num]) => (
          <div key={lbl} className="stat-card">
            <div className="num">{num}</div>
            <div className="lbl">{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Invite Keys ──────────────────────────────────────────────────────────────
function InviteKeys({ session }) {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);
  const canManage = session.role === "owner" || session.role === "admin";

  const load = useCallback(async () => {
    setLoading(true);
    try { setKeys(await supaFetch("/invite_keys?order=created_at.desc&select=*")); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function generate() {
    try {
      await supaFetch("/invite_keys", {
        method: "POST",
        body: JSON.stringify({
          key: genKey(),
          status: "active",
          created_at: new Date().toISOString(),
          created_by: session.username,
        })
      });
      load();
    } catch (err) { alert(err.message); }
  }

  async function revokeKey(id) {
    try {
      await supaFetch(`/invite_keys?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ status: "revoked" }) });
      load();
    } catch (err) { alert(err.message); }
  }

  function copyKey(k) {
    navigator.clipboard.writeText(k.key).catch(() => {});
    setCopied(k.id);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      {canManage && (
        <div className="panel">
          <h3>Generate Key</h3>
          <p style={{ fontSize: "0.75rem", color: "var(--bee-muted)", marginBottom: "0.75rem" }}>
            Generate a new invite key to share with a new user.
          </p>
          <button className="btn btn-sm" onClick={generate}>⬡ Generate Key</button>
        </div>
      )}
      <div className="panel">
        <h3>All Keys</h3>
        {loading ? <p className="loading">Loading...</p> : (
          <table className="bee-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Status</th>
                <th>Created</th>
                <th>Used By</th>
                {canManage && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {keys.map(k => (
                <tr key={k.id}>
                  <td><span className="key-code">{k.key}</span></td>
                  <td><span className={`badge badge-${k.status === "active" ? "active" : "used"}`}>{k.status}</span></td>
                  <td>{k.created_at ? k.created_at.slice(0, 10) : "—"}</td>
                  <td>{k.used_by || "—"}</td>
                  {canManage && (
                    <td style={{ display: "flex", gap: "4px" }}>
                      <button className="btn btn-sm btn-ghost" onClick={() => copyKey(k)}>
                        {copied === k.id ? "✓ Copied" : "Copy"}
                      </button>
                      {k.status === "active" && (
                        <button className="btn btn-sm btn-danger" onClick={() => revokeKey(k.id)}>Revoke</button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {!keys.length && <tr><td colSpan="5" style={{ color: "var(--bee-muted)" }}>No keys yet.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Users ────────────────────────────────────────────────────────────────────
function Users({ session }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const canManage = session.role === "owner" || session.role === "admin";

  const load = useCallback(async () => {
    setLoading(true);
    try { setUsers(await supaFetch("/users?order=created_at.desc&select=*")); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function toggleBlacklist(user) {
    try {
      await supaFetch(`/users?id=eq.${user.id}`, { method: "PATCH", body: JSON.stringify({ blacklisted: !user.blacklisted }) });
      load();
    } catch (err) { alert(err.message); }
  }

  return (
    <div>
      <div className="panel">
        <h3>All Users</h3>
        {loading ? <p className="loading">Loading...</p> : (
          <table className="bee-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Gmail</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last Login</th>
                {canManage && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.username}{u.id === session.id ? " (you)" : ""}</td>
                  <td>{u.gmail}</td>
                  <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
                  <td>{u.blacklisted ? <span className="badge badge-used">Blacklisted</span> : <span className="badge badge-active">Active</span>}</td>
                  <td>{u.created_at ? u.created_at.slice(0, 10) : "—"}</td>
                  <td>{u.last_login ? u.last_login.slice(0, 10) : "—"}</td>
                  {canManage && u.id !== session.id && (
                    <td>
                      <button className={`btn btn-sm ${u.blacklisted ? "btn-ghost" : "btn-danger"}`} onClick={() => toggleBlacklist(u)}>
                        {u.blacklisted ? "Unban" : "Blacklist"}
                      </button>
                    </td>
                  )}
                  {canManage && u.id === session.id && <td>—</td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Admin Accounts ───────────────────────────────────────────────────────────
function AdminAccounts({ session }) {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const isOwner = session.role === "owner";

  const load = useCallback(async () => {
    setLoading(true);
    try { setAdmins(await supaFetch("/users?role=in.(admin,owner)&order=created_at.asc&select=*")); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function addAdmin(e) {
    e.preventDefault();
    setMsg(null);
    if (form.password !== form.confirm) { setMsg({ err: "Passwords don't match." }); return; }
    try {
      const existing = await supaFetch(`/users?username=eq.${encodeURIComponent(form.username)}&select=id`);
      if (existing.length) throw new Error("Username taken.");
      await supaFetch("/users", {
        method: "POST",
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          gmail: form.username + "@admin.beesploitz",
          role: "admin",
          created_at: new Date().toISOString(),
          last_login: null,
          blacklisted: false,
        })
      });
      setForm({ username: "", password: "", confirm: "" });
      setMsg({ ok: "Admin created." });
      load();
    } catch (err) { setMsg({ err: err.message }); }
  }

  async function changePw(id) {
    const np = prompt("New password:");
    if (!np) return;
    try {
      await supaFetch(`/users?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ password: np }) });
      alert("Password changed.");
    } catch (err) { alert(err.message); }
  }

  async function removeAdmin(id) {
    if (!window.confirm("Remove this admin?")) return;
    try {
      await supaFetch(`/users?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" });
      load();
    } catch (err) { alert(err.message); }
  }

  if (!isOwner) {
    return <div className="panel" style={{ color: "var(--bee-muted)" }}>Only the Owner can manage admin accounts.</div>;
  }

  return (
    <div>
      <div className="panel">
        <h3>Add New Admin</h3>
        <form onSubmit={addAdmin}>
          <div className="form-row">
            <div className="field"><label>Username</label><input value={form.username} onChange={e => set("username", e.target.value)} placeholder="adminname" /></div>
            <div className="field"><label>Password</label><input type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="••••••••" /></div>
            <div className="field"><label>Confirm PW</label><input type="password" value={form.confirm} onChange={e => set("confirm", e.target.value)} placeholder="••••••••" /></div>
            <button className="btn btn-sm" type="submit" style={{ marginBottom: 0 }}>Add Admin</button>
          </div>
          {msg?.err && <p className="err">{msg.err}</p>}
          {msg?.ok  && <p className="ok">{msg.ok}</p>}
        </form>
      </div>
      <div className="panel">
        <h3>Admin Accounts</h3>
        {loading ? <p className="loading">Loading...</p> : (
          <table className="bee-table">
            <thead>
              <tr><th>Username</th><th>Role</th><th>Created</th><th>Last Login</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {admins.map(a => (
                <tr key={a.id}>
                  <td>{a.username} {a.id === session.id ? <span className="badge badge-owner">YOU</span> : null}</td>
                  <td><span className={`badge badge-${a.role}`}>{a.role}</span></td>
                  <td>{a.created_at ? a.created_at.slice(0, 10) : "—"}</td>
                  <td>{a.last_login ? a.last_login.slice(0, 10) : "—"}</td>
                  <td style={{ display: "flex", gap: "4px" }}>
                    <button className="btn btn-sm btn-ghost" onClick={() => changePw(a.id)}>Change PW</button>
                    {a.role !== "owner" && <button className="btn btn-sm btn-danger" onClick={() => removeAdmin(a.id)}>Remove</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Blacklist ────────────────────────────────────────────────────────────────
function Blacklist({ session }) {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const canManage = session.role === "owner" || session.role === "admin";

  const load = useCallback(async () => {
    setLoading(true);
    try { setList(await supaFetch("/users?blacklisted=eq.true&select=*")); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addToBlacklist() {
    if (!input.trim()) return;
    try {
      const rows = await supaFetch(`/users?username=eq.${encodeURIComponent(input.trim())}&select=id`);
      if (!rows.length) { alert("User not found."); return; }
      await supaFetch(`/users?id=eq.${rows[0].id}`, { method: "PATCH", body: JSON.stringify({ blacklisted: true }) });
      setInput("");
      load();
    } catch (err) { alert(err.message); }
  }

  async function unblacklist(id) {
    try {
      await supaFetch(`/users?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ blacklisted: false }) });
      load();
    } catch (err) { alert(err.message); }
  }

  return (
    <div>
      {canManage && (
        <div className="panel">
          <h3>Add to Blacklist</h3>
          <div className="input-btn">
            <input
              className="field input"
              style={{ background: "#1a1500", border: "1px solid var(--bee-border-bright)", color: "var(--bee-text)", padding: "0.5rem 0.75rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem", borderRadius: "6px", outline: "none", flex: 1 }}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Username to blacklist..."
              onKeyDown={e => e.key === "Enter" && addToBlacklist()}
            />
            <button className="btn btn-sm" onClick={addToBlacklist}>Add to Blacklist</button>
          </div>
        </div>
      )}
      <div className="panel">
        <h3>Blacklisted Users</h3>
        {loading ? <p className="loading">Loading...</p> : (
          <table className="bee-table">
            <thead>
              <tr><th>Username</th><th>Gmail</th><th>Blacklisted On</th>{canManage && <th>Actions</th>}</tr>
            </thead>
            <tbody>
              {list.map(u => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.gmail}</td>
                  <td>{u.updated_at ? u.updated_at.slice(0, 10) : "—"}</td>
                  {canManage && (
                    <td><button className="btn btn-sm btn-ghost" onClick={() => unblacklist(u.id)}>Unblacklist</button></td>
                  )}
                </tr>
              ))}
              {!list.length && <tr><td colSpan={4} style={{ color: "var(--bee-muted)" }}>No blacklisted users.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Backdoored Games ─────────────────────────────────────────────────────────
function BackdooredGames({ session }) {
  const [games, setGames] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [loading, setLoading] = useState(true);
  const isOwner = session.role === "owner";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const g = await supaFetch("/backdoored_games?order=detected_at.desc&select=*");
      setGames(g);
      const cfg = await supaFetch("/config?key=eq.roblox_api_key&select=value").catch(() => []);
      if (cfg.length) setSavedKey(cfg[0].value);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function saveApiKey() {
    try {
      const existing = await supaFetch("/config?key=eq.roblox_api_key&select=id").catch(() => []);
      if (existing.length) {
        await supaFetch(`/config?id=eq.${existing[0].id}`, { method: "PATCH", body: JSON.stringify({ value: apiKey }) });
      } else {
        await supaFetch("/config", { method: "POST", body: JSON.stringify({ key: "roblox_api_key", value: apiKey }) });
      }
      setSavedKey(apiKey);
      alert("API key saved! Games using this model key will appear here automatically.");
    } catch (err) { alert(err.message); }
  }

  async function removeGame(id) {
    if (!window.confirm("Remove this game?")) return;
    try {
      await supaFetch(`/backdoored_games?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" });
      load();
    } catch (err) { alert(err.message); }
  }

  return (
    <div>
      {isOwner && (
        <div className="panel">
          <h3>⬡ Roblox Model API Key</h3>
          <p style={{ fontSize: "0.75rem", color: "var(--bee-muted)", marginBottom: "0.75rem" }}>
            Connect your Roblox Model API key. When a game owner inserts the Beesploitz model into their Roblox game and publishes it,
            the game will automatically appear in this tab. Only the Owner can configure this.
          </p>
          {savedKey && <p style={{ fontSize: "0.7rem", color: "var(--bee-success)", marginBottom: "0.5rem" }}>✓ Key connected: {savedKey.slice(0, 12)}...</p>}
          <div className="input-btn">
            <input
              style={{ background: "#1a1500", border: "1px solid var(--bee-border-bright)", color: "var(--bee-text)", padding: "0.5rem 0.75rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", borderRadius: "6px", outline: "none", flex: 1 }}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="Paste your Roblox API key here..."
              type="password"
            />
            <button className="btn btn-sm" onClick={saveApiKey}>Save Key</button>
          </div>
          <p style={{ fontSize: "0.65rem", color: "var(--bee-muted)", marginTop: "0.5rem" }}>
            To receive game reports: insert the Beesploitz Model from the Roblox Creator Marketplace into a game and publish. The model reads this API key and POSTs game info to <code style={{ color: "var(--bee-yellow)" }}>{SUPABASE_URL}/rest/v1/backdoored_games</code>.
          </p>
        </div>
      )}

      <div className="panel">
        <h3>Detected Games</h3>
        {loading ? <p className="loading">Loading...</p> : games.length === 0 ? (
          <p style={{ fontSize: "0.78rem", color: "var(--bee-muted)", padding: "0.5rem 0" }}>
            No backdoored games detected yet. Games will appear here once a publisher inserts the model and publishes their game.
          </p>
        ) : (
          <div className="game-grid">
            {games.map(g => (
              <div key={g.id} className="game-card">
                <div className="game-thumb">🐝</div>
                <div className="game-info">
                  <div className="game-name">{g.game_name || "Unknown Game"}</div>
                  <div className="game-meta">
                    <div>Place ID: {g.place_id || "—"}</div>
                    <div>Owner: {g.owner_name || "—"}</div>
                    <div>Detected: {g.detected_at ? g.detected_at.slice(0, 10) : "—"}</div>
                  </div>
                  {(session.role === "owner" || session.role === "admin") && (
                    <button className="btn btn-sm btn-danger" style={{ marginTop: "0.5rem" }} onClick={() => removeGame(g.id)}>Remove</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard Shell ──────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",         label: "Overview",         roles: ["owner", "admin", "user"] },
  { id: "invite_keys",      label: "Invite Keys",      roles: ["owner", "admin", "user"] },
  { id: "users",            label: "Users",            roles: ["owner", "admin"] },
  { id: "admin_accounts",   label: "Admin Accounts",   roles: ["owner"] },
  { id: "backdoored_games", label: "Backdoored Games", roles: ["owner", "admin", "user"] },
  { id: "blacklist",        label: "Blacklist",        roles: ["owner", "admin"] },
];

function Dashboard({ session, logout }) {
  const [tab, setTab] = useState("overview");
  const visibleTabs = TABS.filter(t => t.roles.includes(session.role));

  const pages = {
    overview:         <Overview />,
    invite_keys:      <InviteKeys session={session} />,
    users:            <Users session={session} />,
    admin_accounts:   <AdminAccounts session={session} />,
    backdoored_games: <BackdooredGames session={session} />,
    blacklist:        <Blacklist session={session} />,
  };

  const currentTab = TABS.find(t => t.id === tab);

  return (
    <div className="stripe-bg">
      <div className="dash">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <span>BEESPLOITZ</span>
          </div>
          {visibleTabs.map(t => (
            <button key={t.id} className={`nav-item ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
          <div className="sidebar-footer">
            <div>{session.username}</div>
            <div style={{ marginTop: "2px" }}><span className={`badge badge-${session.role}`}>{session.role}</span></div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <h2>{currentTab?.label || tab}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--bee-muted)" }}>{session.username}</span>
              <span className={`badge badge-${session.role}`}>{session.role}</span>
              <button className="btn btn-sm btn-ghost" onClick={logout}>Logout</button>
            </div>
          </div>
          {pages[tab] || <p className="loading">Page not found.</p>}
        </main>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Beesploitz() {
  const { session, login, logout } = useSession();

  return (
    <>
      <style>{css}</style>
      {session
        ? <Dashboard session={session} logout={logout} />
        : <AuthPage login={login} />
      }
    </>
  );
}
