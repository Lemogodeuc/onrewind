-- Create tables
CREATE TABLE "videos" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "url" TEXT UNIQUE NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tags" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "value" TEXT UNIQUE NOT NULL
);

CREATE TABLE "_m2m_videos_tags" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "video_id" INT NOT NULL REFERENCES "videos"("id") ON DELETE CASCADE,
  "tag_id" INT NOT NULL REFERENCES "tags"("id") ON DELETE CASCADE
);

-- Seeding some datas
INSERT INTO "videos"("name", "description", "url") VALUES
('France-Ukraine', 'Le résumé et les notes', 'france-ukraine-10-08-2020'),
('Lyon-Nimes', 'Le résumé et les notes', 'lyon-nimes-09-18-2020'),
('Lens-Bordeaux', 'Le résumé et les notes', 'lens-bordeaux-09-18-2020'),
('Rennes-Paris SG', 'Le résumé et les notes', 'rennes-parissg-09-18-2020'),
('Revivez le succès historique de Pierre Gasly', 'Pierre Gasly (Alpha Tauri) a remporté dimanche à Monza le Grand Prix d''Italie, une première pour une pilote français en Formule 1 depuis 1996. Gasly, 24 ans, s''est imposé à l''issue d''une course complètement folle', 'pierre-gasly-highlights-09-06-2020');

INSERT INTO "tags"("value") VALUES
('Football'), ('Basketball'), ('Tennis'), ('Formule 1'), ('Ball sports'), ('Motor sports');

INSERT INTO "_m2m_videos_tags"("video_id", "tag_id") VALUES
(1, 1), (1, 5), (2, 1), (2, 5), (3, 1), (3, 5), (4, 1), (4, 5), (5, 4), (5, 5);
