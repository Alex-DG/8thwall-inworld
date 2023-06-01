# { AR 8thWall ~ Three.js } Inworld - AI Characters ⚡

## Description

- 8thWall AR Inworld experiment

![Screenshot 2022-08-10 154837](https://user-images.githubusercontent.com/4311684/183917872-75d8d990-56f4-40fe-9443-a5e8174dd152.png)

## Setup

- Frontend:

1. Create `.env.local` file in the project root and add your 8th Wall key inside:

```
VITE_8THWALL_APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
```

2. Run the following commands:

```bash
# Install dependencies (only the first time)
yarn

# Run the local server
yarn dev

# Build for production in the dist/ directory
yarn build
```

- Backend:

1. Under `/server` folder run the following commands:

```bash
# Install dependencies (only the first time)
yarn

# Run the local express server
yarn start
```
