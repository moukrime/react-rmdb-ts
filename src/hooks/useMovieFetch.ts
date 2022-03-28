import { useState, useEffect } from "react";
import API, { Movie, Cast, Crew } from "../API";

// Helpers
import { isPersistedState } from "../helpers";

// Types
export type MovieState = Movie & { actors: Cast[]; directors: Crew[] };

export const useMovieFetsh = (movieId: number) => {
  console.log(movieId);
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoadind] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoadind(true);
        setError(false);
        console.log("---", movieId);
        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);

        // Get directors only
        const directors = await credits.crew.filter(
          (member) => member.job === "Director"
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });

        setLoadind(false);
      } catch (error) {
        setError(true);
      }
    };
    const sessionState = isPersistedState(movieId.toString());
    if (sessionState) {
      setState(sessionState);
      setLoadind(false);
      return;
    }
    fetchMovie();
  }, [movieId]);

  // write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(movieId.toString(), JSON.stringify(state));
  }, [movieId, state]);

  return { state, loading, error };
};
