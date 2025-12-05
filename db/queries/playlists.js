import db from "#db/client";

// create a playlist owned by a user
export async function createPlaylist(name, description, userId) {
  const result = await db.query(
    `
    INSERT INTO playlists (name, description, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
    [name, description, userId]
  );

  return result.rows[0];
}

// get a playlist by id
export async function getPlaylistById(id) {
  const result = await db.query(
    `
    SELECT *
    FROM playlists
    WHERE id = $1;
  `,
    [id]
  );

  return result.rows[0];
}

// get playlists owned by a user
export async function getPlaylistsByUserId(userId) {
  const result = await db.query(
    `
    SELECT *
    FROM playlists
    WHERE user_id = $1
    ORDER BY id;
  `,
    [userId]
  );

  return result.rows;
}

// get playlists that belong to this user AND contain this track
export async function getPlaylistsByTrackId(trackId, userId) {
  const result = await db.query(
    `
    SELECT p.*
    FROM playlists p
    JOIN playlists_tracks pt
      ON pt.playlist_id = p.id
    WHERE pt.track_id = $1
      AND p.user_id = $2
    ORDER BY p.id;
  `,
    [trackId, userId]
  );

  return result.rows;
}
