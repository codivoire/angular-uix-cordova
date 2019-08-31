import { animate, style, group, query, transition } from "@angular/animations";

const DURATION = "500ms";
const EASING = "cubic-bezier(0.36,0.66,0.04,1)";
const ANIMATION = DURATION + " " + EASING;

const opts = {
  optional: true
};
const initial = [
  query(
    ":enter, :leave",
    style({
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%"
    }),
    opts
  )
];

export const IosTranstion = [
  transition(":increment", [
    ...initial,
    query(":enter", style({ zIndex: 2 }), opts),
    query(":leave", style({ zIndex: 1 }), opts),
    group([
      query(
        ":enter",
        [
          style({ transform: "translateX(100%)" }),
          animate(ANIMATION, style({ transform: "translateX(0%)" }))
        ],
        opts
      ),
      query(
        ":leave",
        [
          style({ transform: "translateX(0%)" }),
          animate(ANIMATION, style({ transform: "translateX(-20%)" }))
        ],
        opts
      )
    ])
  ]),
  transition(":decrement", [
    ...initial,
    query(":enter", style({ zIndex: 1 }), opts),
    query(":leave", style({ zIndex: 2 }), opts),
    group([
      query(
        ":enter",
        [
          style({ transform: "translateX(-20%)" }),
          animate(ANIMATION, style({ transform: "translateX(0%)" }))
        ],
        opts
      ),
      query(
        ":leave",
        [
          style({ transform: "translateX(0%)" }),
          animate(ANIMATION, style({ transform: "translateX(100%)" }))
        ],
        opts
      )
    ])
  ])
];
