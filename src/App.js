import "./App.css";
import Login from "./Login";
import Player from "./Player";
import { useState, useEffect } from "react";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token, currently_playing_track, playlists }, dispatch] =
    useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((_user) => {
        dispatch({
          type: "SET_USER",
          user: _user,
        });
      });

      spotify.getUserPlaylists().then((playlist) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlist,
        });
      });

      spotify.getPlaylist("37i9dQZEVXcPZkYctmQFDi").then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        });
      });

      spotify.getMyCurrentPlayingTrack().then((response) => {
        dispatch({
          type: "SET_CURRENT_TRACK",
          current_track: response,
        });
      });
    }
  }, []);

  console.log(currently_playing_track);
  console.log(playlists);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
