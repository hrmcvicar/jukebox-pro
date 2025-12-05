import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistsByTrackId } from "#db/queries/playlists";
import requireUser from "#middleware/requireUser";

// GET /tracks
router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

// GET /tracks/:id/playlists
router.get("/:id/playlists", requireUser, async (req, res) => {
  const id = req.params.id;

  const track = await getTrackById(id);

  if (!track) {
    return res.status(404).send("Track not found.");
  }

  const playlists = await getPlaylistsByTrackId(id, req.user.id);
  res.send(playlists);
});
