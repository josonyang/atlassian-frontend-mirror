# Components

## View Page

`@atlaskit/embedded-confluence` exports `ViewPage` component.

Within your React component, you can import the component from the package and then compose it.

```javascript
// Given a confluence page located at:
// https://acmeexample.atlassian.net/wiki/spaces/ABC/pages/1234
// and given parentProduct value = "PRODUCT"

import { ViewPage } from '@atlaskit/embedded-confluence';

const MyComponent = props => {
  return (
    <ArticleWrapper>
      <ViewPage
        contentId={'1234'}
        locale={'en-US'}
        hostname={'acmeexample.atlassian.net'}
        parentProduct={'PRODUCT'}
        spaceKey={'ABC'}
        themeMode={'dark'}
      />
    </ArticleWrapper>
  );
};
```

#### Component API

| Property name             | Type                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `allowedFeatures`         | string[]                                                                                                                  | **(Optional)** - If provided, only features included in the list will be enabled, features not in the list will be disabled. `[]` will disable all features. `'all'` will enable all features. If not provided, default features: byline-contributors, byline-extensions, page-comments, page-reactions, will be enabled. see [description](/packages/confluence/embedded-confluence-public/docs/API-References#allowedfeatures-description) for more. |
| `className`               | string                                                                                                                    | **(Optional)** - If provided, the custom class name will be added on the container element                                                                                                                                                                                                                                                                                                                                                             |
| `contentId`               | string                                                                                                                    | The Id of content from Confluence perspective                                                                                                                                                                                                                                                                                                                                                                                                          |
| `hostname`                | string                                                                                                                    | The Confluence Cloud tenant you want to connect to. This is required when 3rd party is on a different domain than Confluence                                                                                                                                                                                                                                                                                                                           |
| `isHeightSetFromContent ` | boolean                                                                                                                   | **(Optional)** - If provided, the height of the view component will be set to the height of the confluence content being rendered                                                                                                                                                                                                                                                                                                                      |
|                           |
| `locale`                  | string                                                                                                                    | **(Optional)** - Locale string for localization. The default locale is `"en-US"`. Please refer to API-References page for a list of other valid values.                                                                                                                                                                                                                                                                                                |
| `navigationPolicy`        | Object, see [definition](/packages/confluence/embedded-confluence-public/docs/API-References#navigationpolicy-definition) | **(Optional)** See [description](/packages/confluence/embedded-confluence-public/docs/API-References#navigationpolicy-description) and [examples](/packages/confluence/embedded-confluence-public/docs/API-References#navigationpolicy-examples)                                                                                                                                                                                                       |
| `parentProduct`           | string                                                                                                                    | Value that is associated with corresponding platform that is embedding Confluence pages. Required to properly embed. If unsure of what this string value is, please reach out to Atlassian/an Atlassian representative.                                                                                                                                                                                                                                |
| `spaceKey`                | string                                                                                                                    | The key of space the content belongs to, from Confluence perspective.                                                                                                                                                                                                                                                                                                                                                                                  |
| `themeMode`               | `ThemeMode`, see [definition](/packages/confluence/embedded-confluence-public/docs/API-References#themeMode)              | **(Optional)** A value that represents the theme preference of the platform that is embedding Confluence pages. See [Atlassian design system documentation] (https://atlassian.design/components/tokens/code#setglobalthemethemestate) for a list of the current themes available (the `colorMode` values represent the valid themeMode values that can be used with this prop).                                                                       |

## Edit Page

`@atlaskit/embedded-confluence` exports `EditPage` component.

Within your React component, you can import the component from the package and then compose it.

```jsx
// Given a confluence page located at:
// https://acmeexample.atlassian.net/wiki/spaces/ABC/pages/edit-v2/1234
// and given parentProduct value = "PRODUCT"

import { EditPage } from '@atlaskit/embedded-confluence';

const MyComponent = props => {
  return (
    <ArticleWrapper>
      <EditPage
        contentId={'1234'}
        locale={'en-US'}
        hostname={'acmeexample.atlassian.net'}
        parentProduct={'PRODUCT'}
        spaceKey={'ABC'}
        themeMode={'dark'}
      />
    </ArticleWrapper>
  );
};
```

#### Component API

| Property name      | Type                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedFeatures`  | string[]                                                                                                                  | **(Optional)** - If provided, only features included in the list will be enabled, features not in the list will be disabled. `[]` will disable all features. `'all'` will enable all features. If not provided, default features (none so far in the editing mode) will be enabled. see [description](/packages/confluence/embedded-confluence-public/docs/API-References#allowedfeatures-description) for more. |
| `contentId`        | string                                                                                                                    | The Id of content from Confluence perspective                                                                                                                                                                                                                                                                                                                                                                    |
| `draftShareId`     | string                                                                                                                    | **(Optional)** - It is required only for **Unpublished Draft**. **Unpublished Draft** is a Confluence page that has not been published yet. Users (with exception the author) needs a valid `draftShareId` to have permission to view it. When a page is created, Confluence will generate a `draftShareId`.                                                                                                     |
| `hostname`         | string                                                                                                                    | The Confluence Cloud tenant you want to connect to. This is required when 3rd party is on a different domain than Confluence                                                                                                                                                                                                                                                                                     |
| `navigationPolicy` | Object, see [definition](/packages/confluence/embedded-confluence-public/docs/API-References#navigationpolicy-definition) | **(Optional)** - (See [description](/packages/confluence/embedded-confluence-public/docs/API-References#navigationpolicy-description) and [examples](/packages/confluence/embedded-confluence-public/docs/API-References#navigationpolicy-examples)                                                                                                                                                              |
| `locale`           | string                                                                                                                    | **(Optional)** - Locale string for localization. The default locale is `"en-US"`.                                                                                                                                                                                                                                                                                                                                |
| `parentProduct`    | string                                                                                                                    | Value that is associated with corresponding platform that is embedding Confluence pages. Required to properly embed. If unsure of what this string value is, please reach out to Atlassian/an Atlassian representative.                                                                                                                                                                                          |
| `themeMode`        | `ThemeMode`, see [definition](/packages/confluence/embedded-confluence-public/docs/API-References#themeMode)              | **(Optional)** An optional value that represents the theme preference of the platform that is embedding Confluence pages. See [Atlassian design system documentation] (https://atlassian.design/components/tokens/code#setglobalthemethemestate) for a list of the current themes available (the `colorMode` values represent the valid themeMode values that can be used with this prop).                       |

### Note

- To handle navigation when user click on the "Close" button, please subscribe to experience tracker event: `"taskSuccess"` of `"edit-page/close"` experience. Please refer to Experience Tracker section for more details.
- To handle navigation when publish is successful after user click on the "Publish" button, please subscribe to experience tracker event: `"taskSuccess"` of `"edit-page/publish"` experience. For failed publish, you can subscribe to `"taskFail"` of the `"edit-page/publish"` experience. Please refer to Experience Tracker section for more details.
