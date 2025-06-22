import { loadperson } from "../reducers/personSlice";
export { removeperson } from "../reducers/personSlice";
import axios from "../../Utils/Axios";

export const asyncLoadperson = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/person/${id}`);

    // Handle 404 from TMDB
    if (detail.data.success === false) {
      dispatch(loadperson({ detail: { success: false } }));
      return;
    }

    const externalid = await axios.get(`/person/${id}/external_ids`);
    const similar = await axios.get(`/person/${id}/combined_credits`);
    const videos = await axios.get(`/person/${id}/videos`);
    const translations = await axios.get(`/person/${id}/translations`);

    const theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      similar: similar.data.cast || [], // 👈 Replaces recommendations
      translations: translations.data.translations.map((t) => t.name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
    };

    dispatch(loadperson(theultimatedetails));
  } catch (error) {
    console.error("🔥 Error fetching person data:", error);
    dispatch(loadperson({ detail: { success: false } }));
  }
};
