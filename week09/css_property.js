const Animation = [
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "will-change",
]

const Transition = [
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
]

const Transform = [
    "backface-visibility",
    "perspective",
    "perspective-origin",
    "rotate",
    "scale",
    "transform",
    "transform-origin",
    "transform-style",
    "translate",
]

const FilterEffects = [
    "backdrop-filter",
    "filter",
]

const Background = [
    "background",
    "background-attachment",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
]

const Border = [
    "border",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "box-shadow",
]

const Font = [
    "font",
    "font-family",
    "font-kerning",
    "font-optical-sizing",
    "font-size",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-variant-ligatures",
    "font-variant-caps",
    "font-variant-numeric",
    "font-variant-east-asian",
    "font-weight",
    "line-height",
]

const Color = [
    "color",
    "opacity",
]

const List = [
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
]

const BoxModel = [
    Margin,
    Padding,
    Size,
    Visibility,
    OverscrollBehavior,
]

const Margin = [
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
]

const Padding = [
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
]

const Size = [
    "height",
    "max-height",
    "min-height",
    "width",
    "max-width",
    "min-width",
]

const Visibility = [
    "visibility",
]

const OverscrollBehavior = [
    "overscroll-behavior",
    "overscroll-behavior-block",
    "overscroll-behavior-inline",
    "overscroll-behavior-x",
    "overscroll-behavior-y",
]

const FlexibleBoxLayout = [
    "flex",
    "flex-basis",
    "flex-grow",
    "flex-shrink",
    "flex-direction",
    "flex-wrap",
    "order",
]

const GridLayout = [
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column-end",
    "grid-column-start",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "grid-row-end",
    "grid-row-start",
]

const Fragmentation = [
    "break-after",
    "break-before",
    "break-inside",
    "orphans",
    "widows",
]

const Column = [
    "columns",
    "column-count",
    "column-gap",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
]

const Table = [
    "border-collapse",
    "border-spacing",
    "caption-side",
    "empty-cells",
    "table-layout",
    "vertical-align",
]

const BoxAlignment = [
    "align-content",
    "align-items",
    "align-self",
    "justify-content",
    "justify-items",
    "justify-self",
    "row-gap",
]

const Positioning = [
    "bottom",
    "clear",
    "float",
    "left",
    "position",
    "right",
    "top",
    "z-index",
]

const CompositingBlending = [
    "background-blend-mode",
    "mix-blend-mode",
    "isolation",
]

const Masking = [
    "clip",
    "clip-path",
    "mask",
    "mask-type",
]

const Shape = [
    "shape-outside",
    "shape-image-threshold",
    "shape-margin",
]

const Text = [
    "hyphens",
    "paint-order",
    "tab-size",
    "text-align",
    "text-align-last",
    "text-decoration",
    "text-decoration-line",
    "text-decoration-style",
    "text-decoration-color",
    "text-decoration-skip-ink",
    "text-underline-position",
    "text-indent",
    "text-rendering",
    "text-shadow",
    "text-size-adjust",
    "text-overflow",
    "text-transform",
    "white-space",
    "word-break",
    "word-spacing",
    "letter-spacing",
]

const GeneratedContent = [
    "content",
    "quotes",
]

const Display = [
    "display",
]

const WritingModes = [
    "direction",
    "text-orientation",
    "unicode-bidi",
    "writing-mode",
]

const BasicUI = [
    "box-sizing",
    "caret-color",
    "cursor",
    "line-break",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "pointer-events",
    "resize",
    "touch-action",
    "user-select",
    "zoom",
]

const Overflow = [
    "overflow",
    "overflow-anchor",
    "overflow-wrap",
    "overflow-x",
    "overflow-y",
    "scroll-behavior",
]

const Image = [
    "image-orientation",
    "image-rendering",
    "object-fit",
    "object-position",
]

const MotionPath = [
    "offset",
    "offset-distance",
    "offset-path",
    "offset-rotate",
]

const SVG = [
    "buffered-rendering",
    "clip-path",
    "clip-rule",
    "text-anchor",
    "display",
    "letter-spacing",
    "color",
    "mask",
    "flood-color",
    "flood-opacity",
    "lighting-color",
    "stop-color",
    "stop-opacity",
    "color-interpolation",
    "color-interpolation-filters",
    "color-rendering",
    "fill",
    "fill-opacity",
    "fill-rule",
    "marker-end",
    "marker-mid",
    "marker-start",
    "vector-effect",
    "paint-order",
    "shape-rendering",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "alignment-baseline",
    "baseline-shift",
    "dominant-baseline",
    "d",
    "cx",
    "cy",
    "x",
    "y",
    "r",
    "rx",
    "ry",
]