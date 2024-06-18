---
title: "FAQ"
slug: "faq"
hidden: false
---

# FAQ

## Why do we use `import.meta.env`?

The template is built in a way that there are pages meant to be accessed only on DEV mode and pages that are meant to be accessed also on PROD mode. For example, “create collection” and “my collections” pages are only meant for local development and can only be accessed on DEV mode while the “public mint” page can be accessed on PROD mode. `import.meta.env` is the `Vite` way to know what is the environment the dapp is running on - DEV or PROD.

## I am getting `"Error": "Simulation failed with status: LOOKUP_FAILED"` when trying to publish my move module - what does it mean?

the move module is trying to use a module that is not live yet

## I tried to publish my dapp to a live server but getting `404 error`

might need to update the root route, if you deployed your site to `user-name.github.io/my-repo` then root route should be updated to `my-repo`
