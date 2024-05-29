---
title: "Aptos Roll: on-chain public instant randomness API"
---

# Aptos Roll: on-chain public instant randomness API

## What does it do: a quick example

### How random numbers have been obtained, insecurely/awkwardly

Building a lottery system and pick a random winner from `n` participants is trivial, at least in the centralized world with a trusted server: the backend simply calls a `random.randint(0, n-1)` (this is a python example).

Unfortunately, without an equivalent of `random.randomint()` in Aptos Move, building a dApp version of it was actually much harder.

One may have written a contract where the random numbers are sampled insecurely (e.g., from the blockchain timestamp):

```move
module module_owner::lottery {
    // ...

    struct LotteryState {
        players: vector<address>,
        winner_idx: std::option::Option<u64>,
    }

    fun load_lottery_state_mut(): &mut LotteryState {
        // ...
    }

    entry fun decide_winner() {
        let lottery_state = load_lottery_state_mut();
        let n = std::vector::length(&lottery_state.players);
        let winner_idx = aptos_framework::timestamp::now_microseconds() % n;
        lottery_state.winner_idx = std::option::some(winner_idx);
    }
}
```

The implementation above is insecure in multiple ways:

- a malicious user may bias the result by picking the transaction submission time;
- a malicious validator can bias the result easily by selecting which block the `decide_winner` transaction goes to.

Other dApps may have chosen to use a external secure randomness source
(e.g., [drand](https://drand.love/)), which is typically a complicated flow:

1. The participants agree on using a future randomness seed promised by the randomness source to determine the winner.
2. Once the randomness seed is revealed, the clients fetch the it and derive the winner locally.
3. One of the participants submits the seed and the winner on chain.

```move
module module_owner::lottery {
    // ...

    struct LotteryState {
        players: vector<address>,
        /// public info about the "future randomness", tyipcally a VRF public key and an input.
        seed_verifier: vector<u8>,
        winner_idx: std::option::Option<u64>,
    }

    fun load_lottery_state_mut(): &mut LotteryState {
        // ...
    }

    fun is_valid_seed(seed_verifier: vector<u8>, seed: vector<u8>): bool {
        // ...
    }

    fun derive_winner(n: u64, seed: vector<u8>): u64 {
        // ...
    }

    entry fun update_winner(winner_idx: u64, seed: vector<u8>) {
        let lottery_state = load_lottery_state_mut();
        assert!(is_valid_seed(lottery_state.seed_verifier, seed), ERR_INVALID_SEED);
        let n = std::vector::length(players);
        let expected_winner_idx = derive_winner(n, seed);
        assert!(expected_winner_idx == winner_idx, ERR_INCORRECT_DERIVATION);
        lottery_state.winner_idx = std::option::some(winner_idx);
    }
}
```

### Achieve simplicity + security with Aptos randomness API

Using Aptos randomness API, the implementation will look like this:

```move
module module_owner::lottery {
    // ...

    struct LotteryState {
        players: vector<address>,
        winner_idx: std::option::Option<u64>,
    }

    fun load_lottery_state_mut(): &mut Lottery {
        // ...
    }

    #[randomness]
    entry fun decide_winner() {
        let lottery_state = load_lottery_state_mut();
        let n = vector::length(&lottery_state.players);
        let winner_idx = aptos_framework::randomness::u64_range(0, n);
        lottery_state.winner_idx = std::option::some(winner_idx);
    }
}
```

where:

- `let winner_idx = aptos_framework::randomness::u64_range(0, n);` is the a randomness API call that returns a u64 integer in range `[0, n)` uniformly at random.
- `#[randomness]` is a required attribute to enable the API call at runtime.

## How to use Aptos randomness API

### Currently supported network

Randomness APIs are enabled on devnet and testnet, and landing soon on mainnet.

### Build Aptos CLI from latest source

Some changes have been made to [Aptos CLI](https://aptos.dev/tools/aptos-cli/) to support compiling a randomness consuming contract.
While the changes haven't been included in an official Aptos CLI release (but coming soon),
you can build it from source to support your randomness-dependent contract development.

```shell
git clone https://github.com/aptos-labs/aptos-core
cd aptos-core
./scripts/dev_setup.sh -b
sudo apt-get install libudev-dev
. ~/.profile
cargo build -p aptos
alias aptos=target/debug/aptos
```

### Identify randomness-dependent entry functions and make them compliant

For safety (discussed with more details later), randomness API calls are only allowed from an entry function that is:

- private, and
- annotated with `#[randomness]`.

It's now a good time to think about what user actions need randomness API, write them down, and make sure they are private and have the right attribute, as shown in the example below.

```move
module module_owner::lottery {
    // ...

    #[randomness]
    entry fun decide_winner() {
        // ...
    }
}
```

At runtime, when randomness API is called, the VM checks whether the outermost of the callstack is a private entry function with `#[randomness]` attribute.
**If not, the enture transaction is aborted.**
NOTE: It also means randomness API calls are supported only in entry function-based transactions.
(For example, using randomness API in a Move script is impossible.)

### Call the API

The APIs are public functions under `0x1::randomness` and can be referenced directly, as demonstrated in the lottery example above.

```move
module module_owner::lottery {
    // ...

    #[randomness]
    entry fun decide_winner() {
        // ...
        let winner_idx = aptos_framework::randomness::u64_range(0, n);
        lottery_state.winner_idx = std::option::some(winner_idx);
    }
}
```

The above example uses function `u64_range()` but many other basic types are also supported.
Here's a quick overview of all the API, where `T` can be one of `u8, u16, u32, u64, u128, u256`.

```move
/// Generates an T uniformly at random.
fun T_integer(): T

/// Generates a number `[min_incl, max_excl)` uniformly at random.
fun T_range(min_incl, ): T

/// Generates a sequence of bytes uniformly at random
fun bytes(n: u64): vector<u8>;

/// Generate a permutation of `[0, 1, ..., n-1]` uniformly at random.
/// If n is 0, returns the empty vector.
fun permutation(n: u64): vector<u64>;
```

The full API function list and documentation can be found [here](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/doc/randomness.md).

## Security considerations

Randomness API is powerful in many ways: it unlocks new dApp designs;
but if used incorrectly, it may leave your dApps open to attacks!
Below are some common mistakes you should avoid.

### Randomness API calls in public functions

As your dApp gets more complicated, you may have multiple entry functions that need to share the same randomness-dependent logic, and want to pull the logic out as a separate helper function.

While this is supported as shown below, extra care must be taken.

```move
module module_owner::lottery {
    // ...

    #[randomness]
    entry fun decide_winner_v0() {
        // ...
        decide_winner_internal(lottery_state);
    }

    #[randomness]
    entry fun decide_winner_v1() {
        // ...
        decide_winner_internal(lottery_state);
    }

    // A private helper function
    fun decide_winner_internal(lottery_state: &mut lottery_state) {
        let n = std::vector::length(&lottery_state.players);
        let winner_idx = aptos_framework::randomness::u64_range(0, n);
        lottery_state.winner_idx = std::option::some(winner_idx);
    }
}
```

If `decide_winner_internal()` were accidentally marked public,
malicious players can deploy their own contract to:

1. call`decide_winner_internal()`;
1. read the lottery result (assuming the `lottery` module has some getter functions for the result);
1. abort if the result is not in their favor.
   By repeatedly calling their own contract until a txn succeeds,
   malicious users can bias the uniform distribution of the winner (dApp developer's initial design).
   This is referred to as a [test-and-abort attack](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-41.md#test-and-abort-attacks).

The Aptos Move compiler has been updated to prevent this attack for your contract safety:
a randomness-dependent public function is treated as a compile error.
If you have finished the steps in the ["build Aptos CLI"](#build-aptos-cli-from-latest-source)) section,
then your Aptos CLI are equipped with the updated compiler.

```move
module module_owner::lottery {
    // Compile error!
    public fun decide_winner_internal(lottery_state: &mut lottery_state) {
        let n = std::vector::length(&lottery_state.players);
        let winner_idx = aptos_framework::randomness::u64_range(0, n);
        lottery_state.winner_idx = std::option::some(winner_idx);
    }
}
```

Not recommended, but if you intend to expose such a randomness-dependent function to the public, you can bypass the compiler check by annotating your function with `#[lint::allow_unsafe_randomness]`.

```move
module module_owner::lottery {
    // Can compile, but use it at your own risk!
    #[lint::allow_unsafe_randomness]
    public fun decide_winner_internal(lottery_state: &mut lottery_state) {
        let n = std::vector::length(&lottery_state.players);
        let winner_idx = aptos_framework::randomness::u64_range(0, n);
        lottery_state.winner_idx = std::option::some(winner_idx);
    }
}
```

### Undergasing attacks, and how to prevent

Imagine such a dApp. It defines a private entry function for a user to:

1. toss a coin (gas cost: 9), then
2. get a reward (gas cost: 10) if coin=1, or get multiple punishments (gas cost: 100) otherwise.

A malicious user can control its account balance so it covers at most 108 gas units (or set transaction parameter `max_gas=108`),
and the punishing branch (total gas cost: 110) will always abort with an out-of-gas error.
The user then repeatedly call the the entry function until it gets the reward.

Formally, this is referred to as an [undergasing attack](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-41.md#undergasing-attacks),
where an attacker can control how much gas is left for the entry function to execute,
and so can arbitrarily decide to abort paths that cost more gas,
biasing the outcome (i.e. effectively changing the distribution of random numbers).

**WARNING: randomness API currently doesn’t prevent undergassing attacks.**
As a dApp developer, you need to be very careful in your design to avoid this type of attack.
Here are some ideas of how to prevent undergasing attack generally.

- Make your entry function gas independent from the randomness outcome.
  Simplest example is to not “act” on the randomness outcome, i.e. read it and store it for later.
- If your dApp involves a trusted admin/admin group, only allow the trusted to execute randomness transaction (i.e. require an admin signer).
- Make the path that is most beneficial have the highest gas (as attacker can only abort paths with gas above a threshold he chooses.
  NOTE: that this can be tricky to get right, and gas schedule can change, and is even harder to get right when there are more than 2 possible outcomes.

Note that everything that doesn’t fall in above categories can be susceptible to undergassing attack in a subtle ways. Reach out if you need help.

We will be providing more functionality in the future, to allow for more complex code to be able to be safe against undergasing attacks.

### It's random, but not a secret

While the randomness API mimics the stdlibs you use to implement a private centralized server,
keep in mind that **the seed is public, and so is your transaction execution**,
and not every randomness-dependent logic in your private centralized server can be transferred on chain safely,
**especially when it involves a secret that only the server should see**.

For example, in your contract, DO NOT try to do the following.

- Use randomness API to generate an asymmetric key pair, discard the private key, then think the public key is safe.
- Use randomness API to shuffle some opened cards, veil them, and think no one knows the permutation.

## Read more

[Aptogotchi Random Mint](https://github.com/aptos-labs/aptogotchi-random-mint/tree/main) is an official demo dApp built to demonstrate the use of randomness API.

The full API function list and documentation can be found [here](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/doc/randomness.md).

You can also find the partial implementation of the API functions and example unit tests [here](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/randomness.move).

See [AIP-41](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-41.md) for the API design,
and [AIP-79](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-79.md) if you are interested in system-level/cryptography details.
