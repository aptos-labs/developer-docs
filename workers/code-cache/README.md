# Code Cache

This is a small cloudflare worker + d1 sqlite db that caches code snippets from Github
and stores them in a sqlite db. They're used for the custom remote codeblock component
in Nextra.


## Getting Started

1. `pnpm install`
2. Setup `wrangler` (Cloudflare's CLI)
3. Setup `.dev.vars` for secrets. Requests need to include the `API_KEY` in headers

```bash filename=".dev.vars"
API_KEY=<KEY_HERE>
```

4. Run `pnpm migrate`
5. Run `pnpm dev`

## Testing

See `github.spec.ts` as an example of how to create unit tests

`pnpm test` will run vitest unit tests