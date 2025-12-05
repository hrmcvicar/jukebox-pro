import db from "#db/client";

// get all tracks
export async function getTracks() {
  const result = await db.query(`
    SELECT *
    FROM tracks
    ORDER BY id;
  `);

  return result.rows;
}

// get one track by id
export async function getTrackById(id) {
  const result = await db.query(
    `
    SELECT *
    FROM tracks
    WHERE id = $1;
  `,
    [id]
  );

  return result.rows[0];
}

// get tracks in a playlist
export async function getTracksByPlaylistId(playlistId) {
  const result = await db.query(
    `
    SELECT t.*
    FROM tracks t
    JOIN playlists_tracks pt
      ON pt.track_id = t.id
    WHERE pt.playlist_id = $1
    ORDER BY t.id;
  `,
    [playlistId]
  );

  return result.rows;
}
