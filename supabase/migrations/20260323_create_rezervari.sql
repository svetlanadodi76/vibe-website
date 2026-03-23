-- Creare tabel rezervări
CREATE TABLE rezervari (
  id            BIGSERIAL PRIMARY KEY,
  nume          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  telefon       TEXT        NOT NULL,
  numar_persoane INTEGER    NOT NULL DEFAULT 2,
  data          DATE        NOT NULL,
  ora           TIME        NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'în așteptare',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activare Row Level Security
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

-- Oricine poate citi rezervările
CREATE POLICY "Public poate citi" ON rezervari
  FOR SELECT USING (true);

-- Oricine poate adăuga o rezervare
CREATE POLICY "Public poate adăuga" ON rezervari
  FOR INSERT WITH CHECK (true);

-- Oricine poate modifica o rezervare
CREATE POLICY "Public poate modifica" ON rezervari
  FOR UPDATE USING (true);

-- Oricine poate șterge o rezervare
CREATE POLICY "Public poate șterge" ON rezervari
  FOR DELETE USING (true);
