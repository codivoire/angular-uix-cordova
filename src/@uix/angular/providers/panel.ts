import { Injectable } from "@angular/core";
import { HelperArray } from "../helpers/array";

export interface PanelOption {
  el: HTMLElement;
  side: string;
  effect: string;
  resizable: boolean;
}

export interface PanelElements {
  left?: Element;
  right?: Element;
}

export enum PanelSides {
  left = "left",
  right = "right"
}

export type PanelSide = "left" | "right";
export type PanelMode = "cover" | "reveal";

@Injectable({
  providedIn: "root"
})
export class PanelProvider {
  private el: Element;
  private selectedSide: PanelSide = "left";
  private panelElement: PanelElements = {};
  private panelModes: any = {
    left: "cover",
    right: "cover"
  };
  private panelState: any = {
    left: false,
    right: false
  };
  private panelClasses = {
    left: {
      cover: "with-panel-left-cover",
      reveal: "with-panel-left-reveal"
    },
    right: {
      cover: "with-panel-right-cover",
      reveal: "with-panel-right-reveal"
    }
  };

  private selectors = {
    panel: "uix-panel",
    backdrop: "uix-panel-backdrop"
  };

  private transition = {
    ios: 400,
    md: 300
  };

  constructor() {
    const panels = document.querySelectorAll(this.selectors.panel);

    if (panels.length) {
      const panel = panels[0];
      const parentDiv = panel.parentNode;
      const backdrop = document.createElement(this.selectors.backdrop);

      parentDiv.insertBefore(backdrop, panel);

      panels.forEach(p => {
        let side = PanelSides.left;

        if (HelperArray.inArray("left", p.getAttributeNames())) {
          this.panelElement[PanelSides.left] = p;
        }

        if (HelperArray.inArray("right", p.getAttributeNames())) {
          this.panelElement[PanelSides.right] = p;
          side = PanelSides.right;
        }

        if (HelperArray.inArray("reveal", p.getAttributeNames())) {
          this.panelModes[side] = "reveal";
        }
      });
    }

    document
      .querySelector(this.selectors.backdrop)
      .addEventListener("click", () => this.close(this.selectedSide), false);
  }

  open(side: PanelSide = "left") {
    if (!this.panelElement[side]) {
      return false;
    }

    this.el = this.panelElement[side];
    this.wrapHtml(side, this.panelModes[side], true);
  }

  close(side: PanelSide = "left") {
    if (!this.panelElement[side]) {
      return false;
    }

    this.el = this.panelElement[side];
    this.wrapHtml(side, this.panelModes[side], false);
  }

  toggle(side: PanelSide = "left") {
    if (!this.panelElement[side]) {
      return false;
    }

    this.el = this.panelElement[side];
    const state = this.el.hasAttribute("active") ? false : true;

    this.wrapHtml(side, this.panelModes[side], state);
  }

  private wrapHtml(side: PanelSide, type: PanelMode, state: boolean) {
    const sidePanelClass = this.panelClasses[side][type];
    const classList = ["with-panel", sidePanelClass];

    if (state) {
      this.el.setAttribute("active", null);

      setTimeout(() => {
        classList.forEach(c => {
          document.querySelector("html").classList.add(c);
        });
      }, 200);
    } else {
      document.querySelector("html").classList.remove(sidePanelClass);

      setTimeout(() => {
        document.querySelector("html").classList.remove("with-panel");
        this.el.removeAttribute("active");
      }, this.transition.ios);
    }

    this.selectedSide = side;
    this.panelState[side] = state;
  }
}
