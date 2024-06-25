<a id="0x1_bit_vector"></a>

# Module `0x1::bit_vector`

- [Struct `BitVector`](#0x1_bit_vector_BitVector)
- [Constants](#@Constants_0)
- [Function `new`](#0x1_bit_vector_new)
- [Function `set`](#0x1_bit_vector_set)
- [Function `unset`](#0x1_bit_vector_unset)
- [Function `shift_left`](#0x1_bit_vector_shift_left)
- [Function `is_index_set`](#0x1_bit_vector_is_index_set)
- [Function `length`](#0x1_bit_vector_length)
- [Function `longest_set_sequence_starting_at`](#0x1_bit_vector_longest_set_sequence_starting_at)
- [Function `shift_left_for_verification_only`](#0x1_bit_vector_shift_left_for_verification_only)

```move
module 0x1::bit_vector {
}
```

<a id="0x1_bit_vector_BitVector"></a>

## Struct `BitVector`

```move
module 0x1::bit_vector {
    struct BitVector has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_bit_vector_EINDEX"></a>

The provided index is out of bounds

```move
module 0x1::bit_vector {
    const EINDEX: u64 = 131072;
}
```

<a id="0x1_bit_vector_ELENGTH"></a>

An invalid length of bitvector was given

```move
module 0x1::bit_vector {
    const ELENGTH: u64 = 131073;
}
```

<a id="0x1_bit_vector_MAX_SIZE"></a>

The maximum allowed bitvector size

```move
module 0x1::bit_vector {
    const MAX_SIZE: u64 = 1024;
}
```

<a id="0x1_bit_vector_WORD_SIZE"></a>

```move
module 0x1::bit_vector {
    const WORD_SIZE: u64 = 1;
}
```

<a id="0x1_bit_vector_new"></a>

## Function `new`

```move
module 0x1::bit_vector {
    public fun new(length: u64): bit_vector::BitVector
}
```

<a id="0x1_bit_vector_set"></a>

## Function `set`

Set the bit at `bit_index` in the `bitvector` regardless of its previous state.

```move
module 0x1::bit_vector {
    public fun set(bitvector: &mut bit_vector::BitVector, bit_index: u64)
}
```

<a id="0x1_bit_vector_unset"></a>

## Function `unset`

Unset the bit at `bit_index` in the `bitvector` regardless of its previous state.

```move
module 0x1::bit_vector {
    public fun unset(bitvector: &mut bit_vector::BitVector, bit_index: u64)
}
```

<a id="0x1_bit_vector_shift_left"></a>

## Function `shift_left`

Shift the `bitvector` left by `amount`. If `amount` is greater than the
bitvector&apos;s length the bitvector will be zeroed out.

```move
module 0x1::bit_vector {
    public fun shift_left(bitvector: &mut bit_vector::BitVector, amount: u64)
}
```

<a id="0x1_bit_vector_is_index_set"></a>

## Function `is_index_set`

Return the value of the bit at `bit_index` in the `bitvector`. `true`
represents &quot;1&quot; and `false` represents a 0

```move
module 0x1::bit_vector {
    public fun is_index_set(bitvector: &bit_vector::BitVector, bit_index: u64): bool
}
```

<a id="0x1_bit_vector_length"></a>

## Function `length`

Return the length (number of usable bits) of this bitvector

```move
module 0x1::bit_vector {
    public fun length(bitvector: &bit_vector::BitVector): u64
}
```

<a id="0x1_bit_vector_longest_set_sequence_starting_at"></a>

## Function `longest_set_sequence_starting_at`

Returns the length of the longest sequence of set bits starting at (and
including) `start_index` in the `bitvector`. If there is no such
sequence, then `0` is returned.

```move
module 0x1::bit_vector {
    public fun longest_set_sequence_starting_at(bitvector: &bit_vector::BitVector, start_index: u64): u64
}
```

<a id="0x1_bit_vector_shift_left_for_verification_only"></a>

## Function `shift_left_for_verification_only`

```move
module 0x1::bit_vector {
    #[verify_only]
    public fun shift_left_for_verification_only(bitvector: &mut bit_vector::BitVector, amount: u64)
}
```
