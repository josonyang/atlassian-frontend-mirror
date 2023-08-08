<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/locale"

> Do not edit this file. This report is auto-generated using [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
// @public (undocumented)
export const createLocalizationProvider: (
  locale: string,
  formatterOptions?: Intl.DateTimeFormatOptions,
) => LocalizationProvider;

// @public (undocumented)
export type DateFormatter = (date: Date) => string;

// @public (undocumented)
export type DateParser = (date: string) => Date;

// @public (undocumented)
type FormattedParts = Record<Intl.DateTimeFormatPartTypes, string>;

// @public (undocumented)
export interface LocalizationProvider {
  // (undocumented)
  formatDate: DateFormatter;
  // (undocumented)
  formatTime: DateFormatter;
  // (undocumented)
  formatToParts: (date?: Date | number | undefined) => FormattedParts;
  // (undocumented)
  getDaysLong: (weekStartDay?: WeekDay) => Array<string>;
  // (undocumented)
  getDaysShort: (weekStartDay?: WeekDay) => Array<string>;
  // (undocumented)
  getMonthsLong: () => Array<string>;
  // (undocumented)
  parseDate: DateParser;
}

// @public (undocumented)
type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{
  "react": "^16.8.0"
}
```

<!--SECTION END: Peer Dependencies-->