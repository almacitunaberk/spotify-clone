import "./App.css";
import Login from "./Login";
import Player from "./Player";
import { useState, useEffect } from "react";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

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
    }
  }, []);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}

      {/* Spotify Logo */}
      {/* Login Button */}
    </div>
  );
}

export default App;
