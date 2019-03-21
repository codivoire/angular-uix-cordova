import { animate, style, group, query, transition } from "@angular/animations";

const OFF_BOTTOM = "56px";
const CENTER = "0px";

const opts = {
  optional: true
};
const initial = [
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
  )
];

export const MdTranstion = {
  forward: [
    transition("* <=> *", [
      ...initial,
      query(":enter", style({ zIndex: 2 }), opts),
      query(":leave", style({ zIndex: 1 }), opts),
      group([
        query(
          ":enter",
          [
            style({
              transform: "translateY(" + OFF_BOTTOM + ")",
              opacity: 0.01
            }),
            animate(
              "400ms cubic-bezier(0.36,0.66,0.04,1)",
              style({ transform: "translateY(" + CENTER + ")", opacity: 1 })
            )
          ],
          opts
        ),
        query(
          ":leave",
          [style({ transform: "translateY(" + CENTER + ")" })],
          opts
        )
      ])
    ])
  ],
  back: [
    transition("* <=> *", [
      ...initial,
      query(":enter", style({ zIndex: 1 }), opts),
      query(":leave", style({ zIndex: 2 }), opts),
      group([
        query(
          ":enter",
          [style({ transform: "translateY(" + CENTER + ")" })],
          opts
        ),
        query(
          ":leave",
          [
            style({ transform: "translateY(" + CENTER + ")", opacity: 1 }),
            animate(
              "200ms cubic-bezier(0.47,0,0.745,0.715)",
              style({
                transform: "translateY(" + OFF_BOTTOM + ")",
                opacity: 0.01
              })
            )
          ],
          opts
        )
      ])
    ])
  ]
};
