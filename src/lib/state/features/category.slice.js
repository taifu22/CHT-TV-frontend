import { createSlice } from "@reduxjs/toolkit";

export const categorysSlice = createSlice({
  name: "categorys",
  initialState: { 
    category: [],
  },
  reducers: {
      //ici on rècupère tutes les categories des produiits
      getAllsCategories: (state, {payload}) => {
        return {
          //on utilise la méthode reverse de l'array pour afficher le dernier élément du tableau en premier (le All products)
          //sinon si on a ajouté le all product en premier, pas besoin de mettre reverse, car il sera toujours afficher en premiere position de la liste des categories
          //a savoir que sans le reverse ca sera toujours le premier ajouté qui s'affichera en haut de la liste des catégories
          category: payload,
        }
      },
      //ici si on ajoute une nouvelle categorie on l'ajoutera à notre tableau pour la voir directement dans le menu 'leste des categories'
      //dans la dashboard admin
      addNewCategoryAdmin: (state, {payload}) => {
        state.category.push(payload)
      },
      deleteCategoryFromAdmin: (state, {payload}) => {
        state.category = state.category.filter(item => {
          return item._id !== payload;
        })
      },
  }
})

export const { getAllsCategories, addNewCategoryAdmin, deleteCategoryFromAdmin } = categorysSlice.actions; 
export default categorysSlice.reducer;
