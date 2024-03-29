# @atlaskit/heading

## 1.4.3

### Patch Changes

- [#41226](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41226) [`fc7aba3cbae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fc7aba3cbae) - [ux] Further fixes related to heading getting into possible invalid state. Heading will now always produce valid markup / aria-attributes for any configuration. Previously if there was no `HeadingContext` in the tree the heading would not produce accessibly correct markup in some cases. This is now resolved.

## 1.4.2

### Patch Changes

- [#41124](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41124) [`40cd7f0c882`](https://bitbucket.org/atlassian/atlassian-frontend/commits/40cd7f0c882) - Fix to prevent heading getting into possible invalid state.

## 1.4.1

### Patch Changes

- [#41032](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41032) [`8d9dad6b977`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d9dad6b977) - Heading will apply an aria level if rendered as a div. This is an accessibility fix for an incomplete feature shipped in the previous minor version.
- [#40299](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40299) [`b1882fdd842`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1882fdd842) - Change typography token naming to be more verbose.

## 1.4.0

### Minor Changes

- [#40254](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40254) [`9cc7e23c65b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9cc7e23c65b) - [ux] Adds additional heading types via the `variant` prop. This prop has been added to aid deprecation of the previous `level` prop. The `level` prop will be removed in a future release.

## 1.3.8

### Patch Changes

- [#40040](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40040) [`ff79902b24c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff79902b24c) - This package is now onboarded onto the product push model.

## 1.3.7

### Patch Changes

- [#36754](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36754) [`4ae083a7e66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ae083a7e66) - Use `@af/accessibility-testing` for default jest-axe config and jest-axe import in accessibility testing.

## 1.3.6

### Patch Changes

- [#35337](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35337) [`529814693a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/529814693a1) - Pin version of @atlaskit/primitives so it resolves to correct version

## 1.3.5

### Patch Changes

- [#33833](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33833) [`b8b41649492`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8b41649492) - Update how certain background colors are referenced by name. Internal changes only.

## 1.3.4

### Patch Changes

- [#34922](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34922) [`779727e307a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/779727e307a) - Internal change only. Replace all instances of Box with stable @atlaskit/primitives version.

## 1.3.3

### Patch Changes

- [#34443](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34443) [`61cb5313358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61cb5313358) - Removing unused dependencies and dev dependencies

## 1.3.2

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793) [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure legacy types are published for TS 4.5-4.8

## 1.3.1

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649) [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade Typescript from `4.5.5` to `4.9.5`

## 1.3.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258) [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip minor dependency bump

### Patch Changes

- Updated dependencies

## 1.2.1

### Patch Changes

- [#32294](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32294) [`e0460d5d989`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0460d5d989) - Usages of `process` are now guarded by a `typeof` check.

## 1.2.0

### Minor Changes

- [#31206](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31206) [`261420360ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/261420360ec) - Upgrades component types to support React 18.

## 1.1.4

### Patch Changes

- [#31242](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31242) [`cfe48bb7ece`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfe48bb7ece) - Internal change only. Replace usages of Inline/Stack with stable version from `@atlaskit/primitives`.

## 1.1.3

### Patch Changes

- [#31185](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31185) [`b6c5779d358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b6c5779d358) - Internal changes only to restrict usage of `Box` from the primitives package.

## 1.1.2

### Patch Changes

- Updated dependencies

## 1.1.1

### Patch Changes

- [#29390](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/29390) [`18aeca8c199`](https://bitbucket.org/atlassian/atlassian-frontend/commits/18aeca8c199) - Internal change to update token references. There is no expected behaviour or visual change.

## 1.1.0

### Minor Changes

- [#28493](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28493) [`fce52a022f5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fce52a022f5) - Adds typography tokens to @atlaskit/heading.

## 1.0.4

### Patch Changes

- Updated dependencies

## 1.0.3

### Patch Changes

- Updated dependencies

## 1.0.2

### Patch Changes

- [#27341](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/27341) [`95fdae34c94`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95fdae34c94) - Revert experimental change to `@compiled/react` from `@emotion/react`.

## 1.0.1

### Patch Changes

- Updated dependencies

## 1.0.0

### Major Changes

- [#27238](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/27238) [`7d92ed50264`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d92ed50264) - [ux] This package is still considered to be in an experimental state and is discouraged for use in production. The major is to simplify consumption and versioning in product.

  Other changes:

  - Introduction of a `HeadingContext` provider to aid with creating the right semantic structure for headings.
  - Migrated internals to use `@compiled/react` from `@emotion/react`.

## 0.1.18

### Patch Changes

- [#26488](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/26488) [`bc989043572`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc989043572) - Internal changes to apply spacing tokens. This should be a no-op change.

## 0.1.17

### Patch Changes

- [#24874](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24874) [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade Typescript from `4.3.5` to `4.5.5`

## 0.1.16

### Patch Changes

- [#24004](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24004) [`30b11aab9fb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/30b11aab9fb) - Updates `@emotion/core` to `@emotion/react`; v10 to v11. There is no expected behavior change.
- Updated dependencies

## 0.1.15

### Patch Changes

- [#24492](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24492) [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade Typescript from `4.2.4` to `4.3.5`.

## 0.1.14

### Patch Changes

- [#23381](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/23381) [`47b01007f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/47b01007f27) - Introduces color prop with values default and inverse.

## 0.1.13

### Patch Changes

- [#22642](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/22642) [`354050b68da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/354050b68da) - Revert font size calculations to raw pixels.

## 0.1.12

### Patch Changes

- Updated dependencies

## 0.1.11

### Patch Changes

- [#20650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20650) [`cb2392f6d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb2392f6d33) - Upgrade to TypeScript 4.2.4

## 0.1.10

### Patch Changes

- Updated dependencies

## 0.1.9

### Patch Changes

- Updated dependencies

## 0.1.8

### Patch Changes

- Updated dependencies

## 0.1.7

### Patch Changes

- [#16752](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16752) [`19d72473dfb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19d72473dfb) - Updates usage of deprecated token names so they're aligned with the latest naming conventions. No UI or visual changes
- Updated dependencies

## 0.1.6

### Patch Changes

- Updated dependencies

## 0.1.5

### Patch Changes

- [#15998](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/15998) [`f460cc7c411`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f460cc7c411) - Builds for this package now pass through a tokens babel plugin, removing runtime invocations of the tokens() function and improving bundle size.
- Updated dependencies

## 0.1.4

### Patch Changes

- Updated dependencies

## 0.1.3

### Patch Changes

- Updated dependencies

## 0.1.2

### Patch Changes

- Updated dependencies

## 0.1.1

### Patch Changes

- [#13864](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/13864) [`d7a9a4ff7ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7a9a4ff7ec) - Instrumented heading with the new theming package, `@atlaskit/tokens`.
  New tokens will be visible only in applications configured to use the new Tokens API (currently in alpha).
  These changes are intended to be interoperable with the legacy theme implementation.
  Legacy dark mode users should expect no visual or breaking changes.
- Updated dependencies

## 0.1.0

### Minor Changes

- [#12837](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12837) [`ee15e59ba60`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee15e59ba60) - This is the initial release of the Heading package. Typography styles have been duplicated from the `@atlaskit/theme` package as standalone components.

### Patch Changes

- [`46816ee8526`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46816ee8526) - Changes heading element mappings to match '@atlaskit/css-reset'.
- [`f9cd2065648`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9cd2065648) - Removed redundant styles for text-transform, moved font-size to `rem` insteda of `em`.
- Updated dependencies
