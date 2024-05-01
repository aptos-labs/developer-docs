# [Aptos Docs Site](https://docs.aptos.dev)

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

### Troubleshooting

There are some known issues with Nextra, such as search not working in development. These are further described in
[troubleshooting.mdx](./pages/en/docs/setup/troubleshooting.mdx)
