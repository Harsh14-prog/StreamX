import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info : null ,
}

export const MovieSlice = createSlice({
    name : "movie" ,
    initialState ,
    reducers : {

        loadmovie : (state , actions) => {
            state.info = actions.payload
        },

        removemovie : (state , action) => {
            state.info = null ;
        }
    }
})

export const {loadmovie , removemovie} = MovieSlice.actions

export default MovieSlice.reducer