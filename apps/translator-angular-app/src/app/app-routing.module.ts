import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SourceComponent } from "./source-translation-input/source.component";
import { PlaygroundComponent } from "./translation-playground/playground.component";

const routes: Routes = [
  {
    path: "",
    component: SourceComponent,
  },
  {
    path: "playground",
    component: PlaygroundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
