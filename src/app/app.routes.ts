import { Routes } from "@angular/router";
import { Inicio } from "./pages/inicio/inicio";
import { Roteiros } from "./pages/roteiros/roteiros";
import { DetalhesRoteiro } from "./pages/detalhes-roteiro/detalhes-roteiro";
import { Reserva } from "./pages/reserva/reserva";
import { Sobre } from "./pages/sobre/sobre";
import { Dashboard } from "./pages/admin/dashboard/dashboard";
import { Reservas } from "./pages/admin/reservas/reservas";
import { GerenciarRoteiros } from "./pages/admin/gerenciar-roteiros/gerenciar-roteiros";
import { Financeiro } from "./pages/admin/financeiro/financeiro";
import { Funcionarios } from "./pages/admin/funcionarios/funcionarios";

// Lista com todas as rotas da aplicação.
export const routes: Routes = [
  { path: "", component: Inicio },
  { path: "roteiros", component: Roteiros },
  { path: "roteiros/:id", component: DetalhesRoteiro },
  { path: "reserva/:id", component: Reserva },
  { path: "sobre", component: Sobre },
  {
    // Ao acessar /admin, abre o dashboard administrativo.
    path: "admin",
    redirectTo: "admin/dashboard",
    pathMatch: "full",
  },
  {
    // Página inicial da área administrativa.
    path: "admin/dashboard",
    component: Dashboard,
  },
  { path: "admin/reservas", component: Reservas },
  { path: "admin/roteiros", component: GerenciarRoteiros },
  { path: "admin/financeiro", component: Financeiro },
  { path: "admin/funcionarios", component: Funcionarios },
  { path: "**", redirectTo: "" },
];