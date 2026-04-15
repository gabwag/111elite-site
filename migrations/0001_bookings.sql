-- 111 Elite Car Service — D1 bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  name        TEXT    NOT NULL,
  phone       TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  pickup      TEXT    NOT NULL,
  dropoff     TEXT,
  date        TEXT    NOT NULL,
  time        TEXT    NOT NULL,
  passengers  TEXT    DEFAULT '1',
  notes       TEXT,
  ip          TEXT,
  user_agent  TEXT
);
