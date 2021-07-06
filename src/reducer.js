export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
  discover_weekly: null,
  currently_playing_track: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_CURRENT_TRACK":
      return {
        ...state,
        currently_playing_track: action.current_track,
      };
    default:
      return state;
  }
};

export default reducer;
