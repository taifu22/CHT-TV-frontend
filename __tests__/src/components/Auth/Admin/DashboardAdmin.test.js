import { render } from '../../../../../test-utils';
import React from "react";
import DashboardAdmin, { handleMenu } from "../../../../../src/components/Auth/Admin/DashboardAdmin";


describe('naviguer entre les menus dans la dashboard admin', () => {
    test('afficher la page list des produits si on click dans le menu list des produits', () => {

        render(<DashboardAdmin />)
        expect(screen.getByText("Liste des produits")).toBeInTheDocument(); 

    })
})