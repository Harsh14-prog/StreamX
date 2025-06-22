import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info : null ,
}

export const personSlice = createSlice({
    name : "person" ,
    initialState ,
    reducers : {

        loadperson : (state , actions) => {
            state.info = actions.payload
        },

        removeperson : (state , action) => {
            state.info = null ;
        }
    }
})

export const {loadperson , removeperson} = personSlice.actions

export default personSlice.reducer