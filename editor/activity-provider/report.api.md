## API Report File for "@atlaskit/activity-provider"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
// @public (undocumented)
export class ActivityError extends Error {
  constructor(message: string, status?: number);
  // (undocumented)
  status?: number;
}

// @public (undocumented)
export interface ActivityItem {
  // (undocumented)
  container: string;
  // (undocumented)
  iconUrl: string;
  // (undocumented)
  name: string;
  // (undocumented)
  objectId: string;
  // (undocumented)
  type?: string;
  // (undocumented)
  url: string;
  // (undocumented)
  viewedTimestamp?: string;
}

// @public (undocumented)
export interface ActivityProvider {
  // (undocumented)
  getRecentItems(): Promise<Array<ActivityItem>>;
  // (undocumented)
  searchRecent(query: string): Promise<Array<ActivityItem>>;
}

// @public (undocumented)
export class ActivityResource implements ActivityProvider {
  constructor(url: string, cloudId: string, options?: RequestInit);
  // (undocumented)
  getRecentItems(): Promise<
    {
      objectId: string;
      name: string;
      container: string;
      url: string;
      iconUrl: string;
      type: ActivityObjectType;
      viewedTimestamp: string;
    }[]
  >;
  // (undocumented)
  searchRecent(query: string): Promise<ActivityItem[]>;
}

// (No @packageDocumentation comment for this package)
```