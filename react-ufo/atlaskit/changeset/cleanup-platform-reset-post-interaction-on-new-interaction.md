---
'@atlaskit/react-ufo': patch
---

Remove fully-launched feature gate `platform_reset_post_interaction_on_new_interaction`. The enabled
code path (`postInteractionLog.reset()` and `stopVCObserver()` on new interaction) is now the
permanent behavior.
