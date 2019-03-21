import { animate, style, group, query, transition } from "@angular/animations";

const DURATION = "500ms";
const EASING = "cubic-bezier(0.36,0.66,0.04,1)";
const CENTER = "0%";
const OFF_OPACITY = 0.8;

const animation = DURATION + " " + EASING;
const opts = {
  optional: true
};

export const IosTranstion = {
  forward: [
    transition("* <=> *", [
      query(
        ":enter, :leave",
        style({
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%"
        }),
        opts
      ),
      query(":enter", style({ zIndex: 2 }), opts),
      query(":leave", style({ zIndex: 1 }), opts),
      group([
        query(
          ":enter",
          [
            style({ transform: "translateX(100%)" }),
            animate(animation, style({ transform: "translateX(0%)" }))
          ],
          opts
        ),
        query(
          ":leave",
          [
            style({ transform: "translateX(0%)" }),
            animate(animation, style({ transform: "translateX(-20%)" }))
          ],
          opts
        )
      ])
    ])
  ],
  back: [
    transition("* <=> *", [
      query(
        ":enter, :leave",
        style({
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%"
        }),
        opts
      ),
      query(":enter", style({ zIndex: 1 }), opts),
      query(":leave", style({ zIndex: 2 }), opts),
      group([
        query(":enter", [
          style({ transform: "translateX(-20%)" }),
          animate("500ms " + EASING, style({ transform: "translateX(0%)" }))
        ]),
        query(":leave", [
          style({ transform: "translateX(0%)" }),
          animate("500ms " + EASING, style({ transform: "translateX(100%)" }))
        ])
      ])
    ])
  ]
};
