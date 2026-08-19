import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-menu-admin",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./menu-admin.html",
  styleUrl: "./menu-admin.css",
})
export class MenuAdmin {}