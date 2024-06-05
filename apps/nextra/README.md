# [Aptos Docs Site](https://aptos.dev)

The official website for [Aptos Docs](https://github.com/aptos-labs/nextra).

To develop locally, clone this repository and run the following command to start
the local dev server:

### Development

1. From the root of the `developer-docs` directory, run:

```bash filename="Terminal"
pnpm i
```

2. Navigate back to `nextra`

Create a `.env` file in the root of `nextra` with the following

```bash filename="Terminal"
NEXT_PUBLIC_ORIGIN="http://localhost:3030"
NEXT_PUBLIC_CODECACHE_API_KEY="<API_KEY>"
```

Note: There is an example at `apps/nextra/.env.example` that
you can duplicate and rename the duplicate to `.env`.

3. Then run

```bash filename="Terminal"
pnpm dev
```

And visit `localhost:3030` to preview your changes.

### Production

1. From the root of the `developer-docs` directory run:

```bash filename="Terminal"
npx turbo run build --filter={apps/nextra}...
```

Note: This guarantees that all dependencies are built properly, in addition to `nextra` being built properly.

If there are no changes to other packages, you can just do

```bash filename="Terminal"
pnpm build
```

from inside the `nextra` directory.

2. Navigate back to `nextra`

3. Then run

```bash filename="Terminal"
pnpm start
```

### Fixing Relative Links

1. Go to `update-relative-links.py`
2. Update the absolute paths in the file

### Link Checking

1. Install [`markdown-link-check`](https://www.npmjs.com/package/markdown-link-check) globally.
2. From the directory you would like to check, run the following command:
   `find . -name \*.mdx -print0 | xargs -0 -n1 markdown-link-check`
3. Scroll through and verify if any links marked with an X are actually problematic. (See known issues below for reasons they may be fine)

KNOWN ISSUE: This link checker does not recognize within-page links like \[\]\(#abc\). It will mark them with an X when they are fine.
There are also rare instances where this link checker is blocked by a DDOS protection service, such as when pointing to Hasura.

### Troubleshooting

There are some known issues with Nextra, such as search not working in development. These are further described in
[troubleshooting.mdx](pages/en/developer-platforms/contribute/setup/troubleshooting.mdx)
