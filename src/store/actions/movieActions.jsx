import { loadmovie  } from "../reducers/MovieSlice";
import axios from "../../Utils/Axios";
export { removemovie } from "../reducers/MovieSlice";

export const asyncLoadmovie = (id) => async (dispatch) => {

    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const translations = await axios.get(`/movie/${id}/translations`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

        const theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map((t) => t.name),
            videos: videos.data.results.find(m => m.type === "Trailer"), // videos.data.results madhe array of multiple obj aahe asa obj hava jyacha type trailer aahe , "m" is that object here
            watchproviders: watchproviders.data.results.IN,

        };

        dispatch(loadmovie(theultimatedetails))
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}