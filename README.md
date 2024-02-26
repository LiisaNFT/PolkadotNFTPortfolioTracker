![image](https://github.com/LiisaNFT/PolkadotNFTPortfolioTracker/assets/139144686/93a43242-892b-4ecf-8070-4856b19bf86c)

# Polkadot NFT Portfolio Tracker by Liisa

This project builds an NFT portfolio tracker tailored for the Polkadot ecosystem. It allows users to view and analyze their NFT holdings across different protocols within the Polkadot ecosystem. This project is being developed by Liisa, a multi-chain NFT data analytics platform.

## Features

- **Display NFT holdings** from supported protocols like Astar, Moonbeam, etc.
- **Provide overview metrics** like estimated portfolio value, sales, revenue etc.
- **Assess portfolio** with metrics like liquidity, volatility and diversification.
- **View details** for each NFT like value, rarity, sales history etc.
- **Analyze collections** based on performance and impact on portfolio.

## Architecture

The project uses a modular architecture with these main components:

- **Backend APIs**: Written in Node.js, it fetches on-chain data using Subsquid and runs analytics.
- **PostgreSQL database**: Stores all NFT data.
- **Frontend**: Developed in React, it provides the portfolio dashboard and visualizations.
- **Bubble.io plugins**: Enable wallet connectivity.

## Getting Started

The project is open source under Apache 2.0 license. To run it locally:

```bash
# For each chain repeat steps 4, 5, 6 and 7
# 0. Install @subsquid/cli a.k.a. the sqd command globally
npm i -g @subsquid/cli

# 1. Clone the repo
git clone https://github.com/LiisaNFT/PolkadotNFTPortfolioTracker
cd multichain-indexer

# 2. Install dependencies
npm ci

# 3. Build the squid project
sqd build

# 4. Start a Postgres database container and detach
sqd down
sqd up

# 5. Generate the schema migrations
sqd migration:generate
sqd migration:apply

# 6. Run all squids at the same time. 
sqd run

# 7. Start the GraphQL server by running in yet another terminal when the squids are stopped,
# otherwise just open in a browser http://localhost:4350/graphql
sqd serve

A GraphiQL playground will be available at [localhost:4350/graphql](http://localhost:4350/graphql).

# 8. Run all tests
npm test
```

## License

This project is licensed under Apache 2.0. See [LICENSE](LICENSE.md) file for details.

# Stay tuned for updates!

Visit our [Website](https://www.liisa.io), follow us on [Twitter](https://https://twitter.com/liisa_io) and join our [Discord](https://discord.gg/6wHSEyc9NX). 
=======
This project is licensed under Apache 2.0. See [LICENSE](LICENSE.md) file for details.
