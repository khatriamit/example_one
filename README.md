## Example SUI contracts along with SUI client that performs PTB (Programmable Transaction Blocks)

### SUI MOVE

Build Move Packages (Smart Contract)

```
sui move build
```

Publish the package

```
sui client publish --gas-budget 100000000
```

### Client

Client package install

```
cd client
yarn install
```

Run script

```
ts-node client/nts.ts
```
