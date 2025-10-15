/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::10d4ca88d4eb59289a9aba2bc6c77d9f>>
 * @codegenCommand yarn build tokens
 */

type TokenValue =
	| string;

type TokenValueOriginal =
	| string;

type TokenAttributes = {
	group: string;
	state: string;
	introduced: string;
	description: string;
	suggest?: string[];
	deprecated?: string;
};


type Token = {
	value: TokenValue;
	filePath: string;
	isSource: boolean;
	attributes: TokenAttributes;
	original: {
		value: TokenValueOriginal;
		attributes: TokenAttributes;
	};
	name: string;
	path: string[];
	cleanName: string;
};

const tokens: Token[] = [
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "2px"
      ],
      "introduced": "6.1.0",
      "description": "Used for small containers such as badges."
    },
    "value": "2px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "2px"
        ],
        "introduced": "6.1.0",
        "description": "Used for small containers such as badges."
      },
      "value": "Radius02"
    },
    "name": "radius.xsmall",
    "path": [
      "radius",
      "xsmall"
    ],
    "cleanName": "radius.xsmall"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "4px"
      ],
      "introduced": "6.1.0",
      "description": "Used for labels."
    },
    "value": "4px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "4px"
        ],
        "introduced": "6.1.0",
        "description": "Used for labels."
      },
      "value": "Radius04"
    },
    "name": "radius.small",
    "path": [
      "radius",
      "small"
    ],
    "cleanName": "radius.small"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "6px"
      ],
      "introduced": "6.1.0",
      "description": "Used for buttons and inputs."
    },
    "value": "12px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "6px"
        ],
        "introduced": "6.1.0",
        "description": "Used for buttons and inputs."
      },
      "value": "Radius12"
    },
    "name": "radius.medium",
    "path": [
      "radius",
      "medium"
    ],
    "cleanName": "radius.medium"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "8px"
      ],
      "introduced": "6.1.0",
      "description": "Used for cards and small containers."
    },
    "value": "16px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "8px"
        ],
        "introduced": "6.1.0",
        "description": "Used for cards and small containers."
      },
      "value": "Radius16"
    },
    "name": "radius.large",
    "path": [
      "radius",
      "large"
    ],
    "cleanName": "radius.large"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "12px"
      ],
      "introduced": "6.1.0",
      "description": "Used for modals and large containers."
    },
    "value": "20px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "12px"
        ],
        "introduced": "6.1.0",
        "description": "Used for modals and large containers."
      },
      "value": "Radius20"
    },
    "name": "radius.xlarge",
    "path": [
      "radius",
      "xlarge"
    ],
    "cleanName": "radius.xlarge"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "50%"
      ],
      "introduced": "6.1.0",
      "description": "Used for circular containers, like a rounded button."
    },
    "value": "9999px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "50%"
        ],
        "introduced": "6.1.0",
        "description": "Used for circular containers, like a rounded button."
      },
      "value": "Radius99"
    },
    "name": "radius.full",
    "path": [
      "radius",
      "full"
    ],
    "cleanName": "radius.full"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "introduced": "6.2.0",
      "description": "Used for tiles only."
    },
    "value": "25%",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "introduced": "6.2.0",
        "description": "Used for tiles only."
      },
      "value": "RadiusPercentage25"
    },
    "name": "radius.tile",
    "path": [
      "radius",
      "tile"
    ],
    "cleanName": "radius.tile"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "1px"
      ],
      "introduced": "1.5.2",
      "description": "The default width for all standard component borders and dividers."
    },
    "value": "1px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "1px"
        ],
        "introduced": "1.5.2",
        "description": "The default width for all standard component borders and dividers."
      },
      "value": "BorderWidth1"
    },
    "name": "border.width.[default]",
    "path": [
      "border",
      "width",
      "[default]"
    ],
    "cleanName": "border.width"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "2px"
      ],
      "introduced": "6.1.0",
      "description": "The width used to indicate a selected element, such as an active tab or a chosen item."
    },
    "value": "2px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "2px"
        ],
        "introduced": "6.1.0",
        "description": "The width used to indicate a selected element, such as an active tab or a chosen item."
      },
      "value": "BorderWidth2"
    },
    "name": "border.width.selected",
    "path": [
      "border",
      "width",
      "selected"
    ],
    "cleanName": "border.width.selected"
  },
  {
    "attributes": {
      "group": "shape",
      "state": "active",
      "suggest": [
        "2px"
      ],
      "introduced": "6.1.0",
      "description": "The width used for the focus ring on interactive elements."
    },
    "value": "2px",
    "filePath": "schema/themes/atlassian-shape-roundest/shape.tsx",
    "isSource": true,
    "original": {
      "attributes": {
        "group": "shape",
        "state": "active",
        "suggest": [
          "2px"
        ],
        "introduced": "6.1.0",
        "description": "The width used for the focus ring on interactive elements."
      },
      "value": "BorderWidth2"
    },
    "name": "border.width.focused",
    "path": [
      "border",
      "width",
      "focused"
    ],
    "cleanName": "border.width.focused"
  }
];

export default tokens;
