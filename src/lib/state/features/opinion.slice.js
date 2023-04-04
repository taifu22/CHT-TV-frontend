import { createSlice } from "@reduxjs/toolkit";

export const opinionsSlice = createSlice({
  name: "opinions",
  initialState: { 
    items: [],
    //ici on stocke coté dashBoard admin l'avis qu'on souhaite visualiser depuis la liste des avis laissés par les utilisateurs
    opinion: null
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
      },
      //voilà c'est ici qu'on stocke dans le store l'opinion qu'on vient d'ouvrir depuis la liste des avis dans la dashboard admin
      setOpinionFromAdmin: (state, {payload}) => {
        state.opinion = payload
      } 
  }
})

export const { getOpinionsSuccess, deleteReportopinion, deleteOpinionRedux, setOpinionFromAdmin } = opinionsSlice.actions;
export default opinionsSlice.reducer;
