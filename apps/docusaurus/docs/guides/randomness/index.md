---
title: "Aptos Roll: on-chain public instant randomness API"
---

# On-chain Randomness

## What is it?

Aptos Roll is native on-chain randomness exclusive only to the Aptos blockchain.

## Example

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
