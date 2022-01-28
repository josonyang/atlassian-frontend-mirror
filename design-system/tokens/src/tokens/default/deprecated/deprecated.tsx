import type { AttributeSchema, DeprecatedTokenSchema } from '../../../types';

const color: AttributeSchema<DeprecatedTokenSchema> = {
  color: {
    accent: {
      boldBlue: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.blue.bold',
          description:
            'Use for blue backgrounds of stronger emphasis when there is no meaning tied to the color, such as bold tags.',
        },
      },
      boldGreen: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.green.bold',
          description:
            'Use for green backgrounds of stronger emphasis when there is no meaning tied to the color, such as bold tags.',
        },
      },
      boldOrange: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.orange.bold',
          description:
            'Use for orange backgrounds of stronger emphasis when there is no meaning tied to the color, such as bold tags.',
        },
      },
      boldPurple: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.purple.bold',
          description:
            'Use for purple backgrounds of stronger emphasis when there is no meaning tied to the color, such as bold tags.',
        },
      },
      boldRed: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.red.bold',
          description:
            'Use for red backgrounds of stronger emphasis when there is no meaning tied to the color, such as bold tags.',
        },
      },
      boldTeal: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.teal.bold',
          description:
            'Use for teal backgrounds of stronger emphasis when there is no meaning tied to the color, such as bold tags.',
        },
      },
      subtleBlue: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.blue.[default]',
          description:
            'Use for blue subdued backgrounds when there is no meaning tied to the color, such as colored tags.',
        },
      },
      subtleGreen: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.green.[default]',
          description:
            'Use for green subdued backgrounds when there is no meaning tied to the color, such as colored tags.',
        },
      },
      subtleMagenta: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.magenta.[default]',
          description:
            'Use for magenta subdued backgrounds when there is no meaning tied to the color, such as colored tags.',
        },
      },
      subtleOrange: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.orange.[default]',
          description:
            'Use for orange subdued backgrounds when there is no meaning tied to the color, such as colored tags.',
        },
      },
      subtlePurple: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.purple.[default]',
          description:
            'Use for purple subdued backgrounds when there is no meaning tied to the color, such as colored tags.',
        },
      },
      subtleRed: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.red.[default]',
          description:
            'Use for red subdued backgrounds when there is no meaning tied to the color, such as colored tags.',
        },
      },
      subtleTeal: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.background.accent.teal.[default]',
          description:
            'Use for teal subdued backgrounds when there is no meaning tied to the color, such as colored tags.',
        },
      },
    },
    background: {
      blanket: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.blanket',
          description:
            'Use for the screen overlay that appears with modal dialogs',
        },
      },
      boldBrand: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.bold.hovered',
            description: 'Hover state of background.boldBrand',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.bold.pressed',
            description: 'Pressed state of background.boldBrand',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.bold.[default]',
            description:
              'A vibrant background for small UI elements like primary buttons and bold in progress lozenges.',
          },
        },
      },
      boldDanger: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.danger.bold.hovered',
            description: 'Hover state of background.boldDanger',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.danger.bold.pressed',
            description: 'Pressed state of background.boldDanger',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.danger.bold.[default]',
            description:
              'A vibrant background for small UI elements like danger buttons and bold removed lozenges.',
          },
        },
      },
      boldDiscovery: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.discovery.bold.hovered',
            description: 'Hover state of background.boldDiscovery',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.discovery.bold.pressed',
            description: 'Pressed state of background.boldDiscovery',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.discovery.bold.[default]',
            description:
              'A vibrant background for small UI elements like onboarding buttons and bold new lozenges.',
          },
        },
      },
      boldNeutral: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.neutral.bold.hovered',
            description: 'Hover state of background.boldNeutral',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.neutral.bold.pressed',
            description: 'Pressed state of background.boldNeutral',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.neutral.bold.[default]',
            description:
              'A vibrant background for small UI elements like unchecked toggles and bold default lozenges.',
          },
        },
      },
      boldSuccess: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.success.bold.hovered',
            description: 'Hover state of background.boldSuccess',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.success.bold.pressed',
            description: 'Pressed state of background.boldSuccess',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.success.bold.[default]',
            description:
              'A vibrant background for small UI elements like checked toggles and bold success lozenges.',
          },
        },
      },
      boldWarning: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.warning.bold.hovered',
            description: 'Hover state of background.boldWarning',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.warning.bold.pressed',
            description: 'Pressed state of background.boldWarning',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.warning.bold.[default]',
            description:
              'A vibrant background for small UI elements like warning buttons and bold moved lozenges.',
          },
        },
      },
      card: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'elevation.surface.raised',
          description:
            'Use for the background of raised cards, such as Jira cards on a Kanban board.\nCombine with shadow.card.',
        },
      },
      default: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'elevation.surface.[default]',
          description: 'Use as the primary background for the UI',
        },
      },
      overlay: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'elevation.surface.overlay',
          description: `
Use for the background of overlay elements, such as modals, dropdown menus, flags, and inline dialogs (i.e. elements that sit on top of the UI).

Also use for the background of raised cards in a dragged state.

Combine with shadow.overlay.`,
        },
      },
      selected: {
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.[default].[default]',
            description: 'Use for backgrounds of elements in a selected state',
          },
        },
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.[default].hovered',
            description: 'Hover state for color.background.selected',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.[default].pressed',
            description: 'Pressed state for color.background.selected',
          },
        },
      },
      subtleBorderedNeutral: {
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.input.pressed',
            description: 'Pressed state for background.subtleBorderedNeutral',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.input.[default]',
            description: 'Hover state for background.subtleBorderedNeutral',
          },
        },
      },
      subtleBrand: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.[default].hovered',
            description: 'Hover state for background.subtleBrand',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.[default].pressed',
            description: 'Pressed state for background.subtleBrand',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.brand.[default].[default]',
            description:
              'Use for subdued backgrounds of UI elements like information section messages and in progress lozenges.',
          },
        },
      },
      subtleDanger: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.danger.[default].hovered',
            description: 'Hover state for background.subtleDanger',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.danger.[default].pressed',
            description: 'Pressed state for background.subtleDanger',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.danger.[default].[default]',
            description:
              'Use for subdued backgrounds of UI elements like error section messages and removed lozenges.',
          },
        },
      },
      subtleDiscovery: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.discovery.[default].hovered',
            description: 'Hover state for background.subtleDiscovery',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.discovery.[default].pressed',
            description: 'Pressed state for background.subtleDiscovery',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.discovery.[default].[default]',
            description:
              'Use for subdued backgrounds of UI elements like discovery section messages and new lozenges.',
          },
        },
      },
      subtleNeutral: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.neutral.[default].hovered',
            description: 'Hover state for background.subtleNeutral',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.neutral.[default].pressed',
            description: 'Pressed state for background.subtleNeutral',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.neutral.[default].[default]',
            description:
              'Use as the default background of UI elements like buttons, lozenges, and tags.',
          },
        },
      },
      subtleSuccess: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.success.[default].hovered',
            description: 'Hover state for background.subtleSuccess',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.success.[default].pressed',
            description: 'Pressed state for background.subtleSuccess',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.success.[default].[default]',
            description:
              'Use for subdued backgrounds of UI elements like success section messages and success lozenges.',
          },
        },
      },
      subtleWarning: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.warning.[default].hovered',
            description: 'Hover state for background.subtleWarning',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.warning.[default].pressed',
            description: 'Pressed state for background.subtleWarning',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.warning.[default].[default]',
            description:
              'Use for subdued backgrounds of UI elements like warning section messages and moved lozenges.',
          },
        },
      },
      sunken: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'elevation.surface.sunken',
          description: 'Use as a secondary background for the UI',
        },
      },
      transparentNeutral: {
        hover: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.neutral.subtle.hovered',
            description:
              'Hover state for UIs that do not have a default background, such as menu items or subtle buttons.',
          },
        },
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.background.neutral.subtle.pressed',
            description:
              'Pressed state for UIs that do not have a default background, such as menu items or subtle buttons.',
          },
        },
      },
    },
    text: {
      highEmphasis: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.text.[default]',
          description:
            'Use for primary text, such as body copy, sentence case headers, and buttons',
        },
      },
      link: {
        pressed: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.link.pressed',
            description: 'Use for links in a pressed state',
          },
        },
        resting: {
          attributes: {
            group: 'paint',
            state: 'deprecated',
            replacement: 'color.link.[default]',
            description:
              'Use for links in a resting or hover state. Add an underline for hover states',
          },
        },
      },
      lowEmphasis: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.text.subtlest',
          description: `
Use for tertiary text, such as meta-data, breadcrumbs, input field placeholder and helper text.

Use for icons that are paired with text.medEmphasis text`,
        },
      },
      mediumEmphasis: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.text.subtle',
          description: `
Use for secondary text, such navigation, subtle button links, input field labels, and all caps subheadings.

Use for icon-only buttons, or icons paired with text.highEmphasis text
          `,
        },
      },
      onBold: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.text.inverse',
          description: 'Use for text and icons when on bold backgrounds',
        },
      },
      onBoldWarning: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.text.warning.inverse',
          description:
            'Use for text and icons when on bold warning backgrounds',
        },
      },
      selected: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.text.brand',
          description:
            'Use for text, icons, borders, or other visual indicators in selected states',
        },
      },
    },
    border: {
      focus: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.border.focused',
          description: 'Use for focus rings of elements in a focus state',
        },
      },
      neutral: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.border.[default]',
          description:
            'Use to create borders around UI elements such as text fields, checkboxes, and radio buttons, or to visually group or separate UI elements, such as flat cards or side panel dividers',
        },
      },
    },
    iconBorder: {
      brand: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.icon.brand',
          description: `
Use rarely for icons or borders representing brand, in-progress, or information, such as the icons in information sections messages.

Also use for blue icons or borders when there is no meaning tied to the color, such as file type icons.`,
        },
      },
      danger: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.icon.danger',
          description: `
Use rarely for icons and borders representing critical information, such the icons in error section messages or the borders on invalid text fields.

Also use for red icons or borders when there is no meaning tied to the color, such as file type icons.`,
        },
      },
      discovery: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.icon.discovery',
          description: `
Use rarely for icons and borders representing new information, such as the icons in discovery section mesages or the borders in onboarding spotlights.

Also use for purple icons or borders when there is no meaning tied to the color, such as file type icons.
`,
        },
      },
      success: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.icon.success',
          description: `
Use rarely for icons and borders representing positive information, such as the icons in success section messages or the borders on validated text fields.

Also use for green icons or borders when there is no meaning tied to the color, such as file type icons.
`,
        },
      },
      warning: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.icon.warning.[default]',
          description: `
Use rarely for icons and borders representing semi-urgent information, such as the icons in warning section messages.

Also use for yellow icons or borders when there is no meaning tied to the color, such as file type icons.
`,
        },
      },
    },
    overlay: {
      hover: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.interaction.hovered',
          description:
            'Use as a background overlay for elements in a hover state when their background color cannot change, such as avatars.',
        },
      },
      pressed: {
        attributes: {
          group: 'paint',
          state: 'deprecated',
          replacement: 'color.interaction.pressed',
          description:
            'Use as a background overlay for elements in a pressed state when their background color cannot change, such as avatars.',
        },
      },
    },
  },
  shadow: {
    card: {
      attributes: {
        group: 'shadow',
        state: 'deprecated',
        replacement: 'elevation.shadow.raised',
        description: `
Use for the box shadow of raised card elements, such as Jira cards on a Kanban board.

Combine with background.overlay`,
      },
    },
    overlay: {
      attributes: {
        group: 'shadow',
        state: 'deprecated',
        replacement: 'elevation.shadow.overlay',
        description: `
Use for the box shadow of overlay elements, such as modals, dropdown menus, flags, and inline dialogs (i.e. elements that sit on top of the UI).

Also use for the box shadow of raised cards in a dragged state.

Combine with background.overlay`,
      },
    },
  },
};

export default color;
