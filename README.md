# next-tsc-proposal
better way to use typescript / postcss / etc with nextjs

gulp and preact branches also

# Custom build with TypeScript Compiler

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/segmentio/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example custom-tbd my-tbd
# or
yarn create next-app --example custom-tbd my-tbd
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/custom-tbd
cd my-tbd
```

Install it and run:

```bash
npm install
node start
# or
yarn
node start
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

## The idea behind the example
the bundler does not need to be coupled to the compilers / optimizers.
The example shows how you can use [TypeScript](https://typescriptlang.com) or any other transpile step to feed the bundler the production ready files 
