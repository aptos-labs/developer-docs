<a id="0x1_big_vector"></a>

# Module `0x1::big_vector`

- [Struct `BigVector`](#0x1_big_vector_BigVector)
- [Constants](#@Constants_0)
- [Function `empty`](#0x1_big_vector_empty)
- [Function `singleton`](#0x1_big_vector_singleton)
- [Function `destroy_empty`](#0x1_big_vector_destroy_empty)
- [Function `destroy`](#0x1_big_vector_destroy)
- [Function `borrow`](#0x1_big_vector_borrow)
- [Function `borrow_mut`](#0x1_big_vector_borrow_mut)
- [Function `append`](#0x1_big_vector_append)
- [Function `push_back`](#0x1_big_vector_push_back)
- [Function `pop_back`](#0x1_big_vector_pop_back)
- [Function `remove`](#0x1_big_vector_remove)
- [Function `swap_remove`](#0x1_big_vector_swap_remove)
- [Function `swap`](#0x1_big_vector_swap)
- [Function `reverse`](#0x1_big_vector_reverse)
- [Function `index_of`](#0x1_big_vector_index_of)
- [Function `contains`](#0x1_big_vector_contains)
- [Function `to_vector`](#0x1_big_vector_to_vector)
- [Function `length`](#0x1_big_vector_length)
- [Function `is_empty`](#0x1_big_vector_is_empty)

```move
module 0x1::big_vector {
    use 0x1::error;
    use 0x1::table_with_length;
    use 0x1::vector;
}
```

<a id="0x1_big_vector_BigVector"></a>

## Struct `BigVector`

A scalable vector implementation based on tables where elements are grouped into buckets.
Each bucket has a capacity of `bucket_size` elements.

```move
module 0x1::big_vector {
    struct BigVector<T> has store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_big_vector_EINDEX_OUT_OF_BOUNDS"></a>

Vector index is out of bounds

```move
module 0x1::big_vector {
    const EINDEX_OUT_OF_BOUNDS: u64 = 1;
}
```

<a id="0x1_big_vector_EVECTOR_EMPTY"></a>

Cannot pop back from an empty vector

```move
module 0x1::big_vector {
    const EVECTOR_EMPTY: u64 = 3;
}
```

<a id="0x1_big_vector_EVECTOR_NOT_EMPTY"></a>

Cannot destroy a non&#45;empty vector

```move
module 0x1::big_vector {
    const EVECTOR_NOT_EMPTY: u64 = 2;
}
```

<a id="0x1_big_vector_EZERO_BUCKET_SIZE"></a>

bucket_size cannot be 0

```move
module 0x1::big_vector {
    const EZERO_BUCKET_SIZE: u64 = 4;
}
```

<a id="0x1_big_vector_empty"></a>

## Function `empty`

Regular Vector API
Create an empty vector.

```move
module 0x1::big_vector {
    public(friend) fun empty<T: store>(bucket_size: u64): big_vector::BigVector<T>
}
```

<a id="0x1_big_vector_singleton"></a>

## Function `singleton`

Create a vector of length 1 containing the passed in element.

```move
module 0x1::big_vector {
    public(friend) fun singleton<T: store>(element: T, bucket_size: u64): big_vector::BigVector<T>
}
```

<a id="0x1_big_vector_destroy_empty"></a>

## Function `destroy_empty`

Destroy the vector `v`.
Aborts if `v` is not empty.

```move
module 0x1::big_vector {
    public fun destroy_empty<T>(v: big_vector::BigVector<T>)
}
```

<a id="0x1_big_vector_destroy"></a>

## Function `destroy`

Destroy the vector `v` if T has `drop`

```move
module 0x1::big_vector {
    public fun destroy<T: drop>(v: big_vector::BigVector<T>)
}
```

<a id="0x1_big_vector_borrow"></a>

## Function `borrow`

Acquire an immutable reference to the `i`th element of the vector `v`.
Aborts if `i` is out of bounds.

```move
module 0x1::big_vector {
    public fun borrow<T>(v: &big_vector::BigVector<T>, i: u64): &T
}
```

<a id="0x1_big_vector_borrow_mut"></a>

## Function `borrow_mut`

Return a mutable reference to the `i`th element in the vector `v`.
Aborts if `i` is out of bounds.

```move
module 0x1::big_vector {
    public fun borrow_mut<T>(v: &mut big_vector::BigVector<T>, i: u64): &mut T
}
```

<a id="0x1_big_vector_append"></a>

## Function `append`

Empty and destroy the other vector, and push each of the elements in the other vector onto the lhs vector in the
same order as they occurred in other.
Disclaimer: This function is costly. Use it at your own discretion.

```move
module 0x1::big_vector {
    public fun append<T: store>(lhs: &mut big_vector::BigVector<T>, other: big_vector::BigVector<T>)
}
```

<a id="0x1_big_vector_push_back"></a>

## Function `push_back`

Add element `val` to the end of the vector `v`. It grows the buckets when the current buckets are full.
This operation will cost more gas when it adds new bucket.

```move
module 0x1::big_vector {
    public fun push_back<T: store>(v: &mut big_vector::BigVector<T>, val: T)
}
```

<a id="0x1_big_vector_pop_back"></a>

## Function `pop_back`

Pop an element from the end of vector `v`. It doesn&apos;t shrink the buckets even if they&apos;re empty.
Call `shrink_to_fit` explicity to deallocate empty buckets.
Aborts if `v` is empty.

```move
module 0x1::big_vector {
    public fun pop_back<T>(v: &mut big_vector::BigVector<T>): T
}
```

<a id="0x1_big_vector_remove"></a>

## Function `remove`

Remove the element at index i in the vector v and return the owned value that was previously stored at i in v.
All elements occurring at indices greater than i will be shifted down by 1. Will abort if i is out of bounds.
Disclaimer: This function is costly. Use it at your own discretion.

```move
module 0x1::big_vector {
    public fun remove<T>(v: &mut big_vector::BigVector<T>, i: u64): T
}
```

<a id="0x1_big_vector_swap_remove"></a>

## Function `swap_remove`

Swap the `i`th element of the vector `v` with the last element and then pop the vector.
This is O(1), but does not preserve ordering of elements in the vector.
Aborts if `i` is out of bounds.

```move
module 0x1::big_vector {
    public fun swap_remove<T>(v: &mut big_vector::BigVector<T>, i: u64): T
}
```

<a id="0x1_big_vector_swap"></a>

## Function `swap`

Swap the elements at the i&apos;th and j&apos;th indices in the vector v. Will abort if either of i or j are out of bounds
for v.

```move
module 0x1::big_vector {
    public fun swap<T>(v: &mut big_vector::BigVector<T>, i: u64, j: u64)
}
```

<a id="0x1_big_vector_reverse"></a>

## Function `reverse`

Reverse the order of the elements in the vector v in&#45;place.
Disclaimer: This function is costly. Use it at your own discretion.

```move
module 0x1::big_vector {
    public fun reverse<T>(v: &mut big_vector::BigVector<T>)
}
```

<a id="0x1_big_vector_index_of"></a>

## Function `index_of`

Return the index of the first occurrence of an element in v that is equal to e. Returns (true, index) if such an
element was found, and (false, 0) otherwise.
Disclaimer: This function is costly. Use it at your own discretion.

```move
module 0x1::big_vector {
    public fun index_of<T>(v: &big_vector::BigVector<T>, val: &T): (bool, u64)
}
```

<a id="0x1_big_vector_contains"></a>

## Function `contains`

Return if an element equal to e exists in the vector v.
Disclaimer: This function is costly. Use it at your own discretion.

```move
module 0x1::big_vector {
    public fun contains<T>(v: &big_vector::BigVector<T>, val: &T): bool
}
```

<a id="0x1_big_vector_to_vector"></a>

## Function `to_vector`

Convert a big vector to a native vector, which is supposed to be called mostly by view functions to get an
atomic view of the whole vector.
Disclaimer: This function may be costly as the big vector may be huge in size. Use it at your own discretion.

```move
module 0x1::big_vector {
    public fun to_vector<T: copy>(v: &big_vector::BigVector<T>): vector<T>
}
```

<a id="0x1_big_vector_length"></a>

## Function `length`

Return the length of the vector.

```move
module 0x1::big_vector {
    public fun length<T>(v: &big_vector::BigVector<T>): u64
}
```

<a id="0x1_big_vector_is_empty"></a>

## Function `is_empty`

Return `true` if the vector `v` has no elements and `false` otherwise.

```move
module 0x1::big_vector {
    public fun is_empty<T>(v: &big_vector::BigVector<T>): bool
}
```
