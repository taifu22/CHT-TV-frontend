import { createSlice } from "@reduxjs/toolkit";

export const opinionsSlice = createSlice({
  name: "opinions",
  initialState: { 
    items: [],
  },
  reducers: {
      //ici on rècupère tutes les opinions dans le store redux pour les afficher en temps réel dans la dashBoard admin
      getOpinionsSuccess: (state, {payload}) => {
        return {
          items: payload,
        }
      },
      deleteReportopinion: (state, {payload}) => {
        state.items = state.items.map(item => {
            //dans l'item de l'opinion on va vider le tableau report (signalation), pour afficher les doubles fleches à coté
            //de l'opinion qui disent que l'opinion signalé a été validé quand meme
            if (item.id === payload) {
                return item = {...item, report:[]}
            }
            return item
        })
      },
      //suppression d'une opinion en temps réel depuis le store de redux
      deleteOpinionRedux: (state, {payload}) => {
        state.items = state.items.filter((pic) => pic.id !== payload);
      }

  }
})

export const { getOpinionsSuccess, deleteReportopinion, deleteOpinionRedux } = opinionsSlice.actions;
export default opinionsSlice.reducer;
