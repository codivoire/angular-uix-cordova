import { animate, style, group, query, transition } from "@angular/animations";

const ANIMATION_FORWARD = "400ms cubic-bezier(0.36,0.66,0.04,1)";
const ANIMATION_BACK = "200ms cubic-bezier(0.47,0,0.745,0.715)";

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

export const MdTranstion = [
  transition(":increment", [
    ...initial,
    query(":enter", style({ zIndex: 2 }), opts),
    query(":leave", style({ zIndex: 1 }), opts),
    group([
      query(
        ":enter",
        [
          style({
            transform: "translateY(56px)",
            opacity: 0.01
          }),
          animate(
            ANIMATION_FORWARD,
            style({ transform: "translateY(0px)", opacity: 1 })
          )
        ],
        opts
      ),
      query(":leave", [style({ transform: "translateY(0px)" })], opts)
    ])
  ]),
  transition(":decrement", [
    ...initial,
    query(":enter", style({ zIndex: 1 }), opts),
    query(":leave", style({ zIndex: 2 }), opts),
    group([
      query(":enter", [style({ transform: "translateY(0px)" })], opts),
      query(
        ":leave",
        [
          style({ transform: "translateY(0px)", opacity: 1 }),
          animate(
            ANIMATION_BACK,
            style({
              transform: "translateY(56px)",
              opacity: 0.01
            })
          )
        ],
        opts
      )
    ])
  ])
];
