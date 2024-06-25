<a id="0x1_smart_vector"></a>

# Module `0x1::smart_vector`

- [Struct `SmartVector`](#0x1_smart_vector_SmartVector)
- [Constants](#@Constants_0)
- [Function `new`](#0x1_smart_vector_new)
- [Function `empty`](#0x1_smart_vector_empty)
- [Function `empty_with_config`](#0x1_smart_vector_empty_with_config)
- [Function `singleton`](#0x1_smart_vector_singleton)
- [Function `destroy_empty`](#0x1_smart_vector_destroy_empty)
- [Function `destroy`](#0x1_smart_vector_destroy)
- [Function `clear`](#0x1_smart_vector_clear)
- [Function `borrow`](#0x1_smart_vector_borrow)
- [Function `borrow_mut`](#0x1_smart_vector_borrow_mut)
- [Function `append`](#0x1_smart_vector_append)
- [Function `add_all`](#0x1_smart_vector_add_all)
- [Function `to_vector`](#0x1_smart_vector_to_vector)
- [Function `push_back`](#0x1_smart_vector_push_back)
- [Function `pop_back`](#0x1_smart_vector_pop_back)
- [Function `remove`](#0x1_smart_vector_remove)
- [Function `swap_remove`](#0x1_smart_vector_swap_remove)
- [Function `swap`](#0x1_smart_vector_swap)
- [Function `reverse`](#0x1_smart_vector_reverse)
- [Function `index_of`](#0x1_smart_vector_index_of)
- [Function `contains`](#0x1_smart_vector_contains)
- [Function `length`](#0x1_smart_vector_length)
- [Function `is_empty`](#0x1_smart_vector_is_empty)
- [Function `for_each`](#0x1_smart_vector_for_each)
- [Function `for_each_reverse`](#0x1_smart_vector_for_each_reverse)
- [Function `for_each_ref`](#0x1_smart_vector_for_each_ref)
- [Function `for_each_mut`](#0x1_smart_vector_for_each_mut)
- [Function `enumerate_ref`](#0x1_smart_vector_enumerate_ref)
- [Function `enumerate_mut`](#0x1_smart_vector_enumerate_mut)
- [Function `fold`](#0x1_smart_vector_fold)
- [Function `foldr`](#0x1_smart_vector_foldr)
- [Function `map_ref`](#0x1_smart_vector_map_ref)
- [Function `map`](#0x1_smart_vector_map)
- [Function `filter`](#0x1_smart_vector_filter)
- [Function `zip`](#0x1_smart_vector_zip)
- [Function `zip_reverse`](#0x1_smart_vector_zip_reverse)
- [Function `zip_ref`](#0x1_smart_vector_zip_ref)
- [Function `zip_mut`](#0x1_smart_vector_zip_mut)
- [Function `zip_map`](#0x1_smart_vector_zip_map)
- [Function `zip_map_ref`](#0x1_smart_vector_zip_map_ref)

```move
module 0x1::smart_vector {
    use 0x1::big_vector;
    use 0x1::error;
    use 0x1::math64;
    use 0x1::option;
    use 0x1::type_info;
    use 0x1::vector;
}
```

<a id="0x1_smart_vector_SmartVector"></a>

## Struct `SmartVector`

A Scalable vector implementation based on tables, Ts are grouped into buckets with `bucket_size`.
The option wrapping BigVector saves space in the metadata associated with BigVector when smart_vector is
so small that inline_vec vector can hold all the data.

```move
module 0x1::smart_vector {
    struct SmartVector<T> has store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_smart_vector_EINDEX_OUT_OF_BOUNDS"></a>

Vector index is out of bounds

```move
module 0x1::smart_vector {
    const EINDEX_OUT_OF_BOUNDS: u64 = 1;
}
```

<a id="0x1_smart_vector_EVECTOR_EMPTY"></a>

Cannot pop back from an empty vector

```move
module 0x1::smart_vector {
    const EVECTOR_EMPTY: u64 = 3;
}
```

<a id="0x1_smart_vector_EVECTOR_NOT_EMPTY"></a>

Cannot destroy a non&#45;empty vector

```move
module 0x1::smart_vector {
    const EVECTOR_NOT_EMPTY: u64 = 2;
}
```

<a id="0x1_smart_vector_EZERO_BUCKET_SIZE"></a>

bucket_size cannot be 0

```move
module 0x1::smart_vector {
    const EZERO_BUCKET_SIZE: u64 = 4;
}
```

<a id="0x1_smart_vector_ESMART_VECTORS_LENGTH_MISMATCH"></a>

The length of the smart vectors are not equal.

```move
module 0x1::smart_vector {
    const ESMART_VECTORS_LENGTH_MISMATCH: u64 = 131077;
}
```

<a id="0x1_smart_vector_new"></a>

## Function `new`

Regular Vector API
Create an empty vector using default logic to estimate `inline_capacity` and `bucket_size`, which may be
inaccurate.
This is exactly the same as empty() but is more standardized as all other data structures have new().

```move
module 0x1::smart_vector {
    public fun new<T: store>(): smart_vector::SmartVector<T>
}
```

<a id="0x1_smart_vector_empty"></a>

## Function `empty`

Create an empty vector using default logic to estimate `inline_capacity` and `bucket_size`, which may be
inaccurate.

```move
module 0x1::smart_vector {
    #[deprecated]
    public fun empty<T: store>(): smart_vector::SmartVector<T>
}
```

<a id="0x1_smart_vector_empty_with_config"></a>

## Function `empty_with_config`

Create an empty vector with customized config.
When inline_capacity &#61; 0, SmartVector degrades to a wrapper of BigVector.

```move
module 0x1::smart_vector {
    public fun empty_with_config<T: store>(inline_capacity: u64, bucket_size: u64): smart_vector::SmartVector<T>
}
```

<a id="0x1_smart_vector_singleton"></a>

## Function `singleton`

Create a vector of length 1 containing the passed in T.

```move
module 0x1::smart_vector {
    public fun singleton<T: store>(element: T): smart_vector::SmartVector<T>
}
```

<a id="0x1_smart_vector_destroy_empty"></a>

## Function `destroy_empty`

Destroy the vector `v`.
Aborts if `v` is not empty.

```move
module 0x1::smart_vector {
    public fun destroy_empty<T>(v: smart_vector::SmartVector<T>)
}
```

<a id="0x1_smart_vector_destroy"></a>

## Function `destroy`

Destroy a vector completely when T has `drop`.

```move
module 0x1::smart_vector {
    public fun destroy<T: drop>(v: smart_vector::SmartVector<T>)
}
```

<a id="0x1_smart_vector_clear"></a>

## Function `clear`

Clear a vector completely when T has `drop`.

```move
module 0x1::smart_vector {
    public fun clear<T: drop>(v: &mut smart_vector::SmartVector<T>)
}
```

<a id="0x1_smart_vector_borrow"></a>

## Function `borrow`

Acquire an immutable reference to the `i`th T of the vector `v`.
Aborts if `i` is out of bounds.

```move
module 0x1::smart_vector {
    public fun borrow<T>(v: &smart_vector::SmartVector<T>, i: u64): &T
}
```

<a id="0x1_smart_vector_borrow_mut"></a>

## Function `borrow_mut`

Return a mutable reference to the `i`th T in the vector `v`.
Aborts if `i` is out of bounds.

```move
module 0x1::smart_vector {
    public fun borrow_mut<T>(v: &mut smart_vector::SmartVector<T>, i: u64): &mut T
}
```

<a id="0x1_smart_vector_append"></a>

## Function `append`

Empty and destroy the other vector, and push each of the Ts in the other vector onto the lhs vector in the
same order as they occurred in other.
Disclaimer: This function may be costly. Use it at your own discretion.

```move
module 0x1::smart_vector {
    public fun append<T: store>(lhs: &mut smart_vector::SmartVector<T>, other: smart_vector::SmartVector<T>)
}
```

<a id="0x1_smart_vector_add_all"></a>

## Function `add_all`

Add multiple values to the vector at once.

```move
module 0x1::smart_vector {
    public fun add_all<T: store>(v: &mut smart_vector::SmartVector<T>, vals: vector<T>)
}
```

<a id="0x1_smart_vector_to_vector"></a>

## Function `to_vector`

Convert a smart vector to a native vector, which is supposed to be called mostly by view functions to get an
atomic view of the whole vector.
Disclaimer: This function may be costly as the smart vector may be huge in size. Use it at your own discretion.

```move
module 0x1::smart_vector {
    public fun to_vector<T: copy, store>(v: &smart_vector::SmartVector<T>): vector<T>
}
```

<a id="0x1_smart_vector_push_back"></a>

## Function `push_back`

Add T `val` to the end of the vector `v`. It grows the buckets when the current buckets are full.
This operation will cost more gas when it adds new bucket.

```move
module 0x1::smart_vector {
    public fun push_back<T: store>(v: &mut smart_vector::SmartVector<T>, val: T)
}
```

<a id="0x1_smart_vector_pop_back"></a>

## Function `pop_back`

Pop an T from the end of vector `v`. It does shrink the buckets if they&apos;re empty.
Aborts if `v` is empty.

```move
module 0x1::smart_vector {
    public fun pop_back<T>(v: &mut smart_vector::SmartVector<T>): T
}
```

<a id="0x1_smart_vector_remove"></a>

## Function `remove`

Remove the T at index i in the vector v and return the owned value that was previously stored at i in v.
All Ts occurring at indices greater than i will be shifted down by 1. Will abort if i is out of bounds.
Disclaimer: This function may be costly. Use it at your own discretion.

```move
module 0x1::smart_vector {
    public fun remove<T>(v: &mut smart_vector::SmartVector<T>, i: u64): T
}
```

<a id="0x1_smart_vector_swap_remove"></a>

## Function `swap_remove`

Swap the `i`th T of the vector `v` with the last T and then pop the vector.
This is O(1), but does not preserve ordering of Ts in the vector.
Aborts if `i` is out of bounds.

```move
module 0x1::smart_vector {
    public fun swap_remove<T>(v: &mut smart_vector::SmartVector<T>, i: u64): T
}
```

<a id="0x1_smart_vector_swap"></a>

## Function `swap`

Swap the Ts at the i&apos;th and j&apos;th indices in the vector v. Will abort if either of i or j are out of bounds
for v.

```move
module 0x1::smart_vector {
    public fun swap<T: store>(v: &mut smart_vector::SmartVector<T>, i: u64, j: u64)
}
```

<a id="0x1_smart_vector_reverse"></a>

## Function `reverse`

Reverse the order of the Ts in the vector v in&#45;place.
Disclaimer: This function may be costly. Use it at your own discretion.

```move
module 0x1::smart_vector {
    public fun reverse<T: store>(v: &mut smart_vector::SmartVector<T>)
}
```

<a id="0x1_smart_vector_index_of"></a>

## Function `index_of`

Return `(true, i)` if `val` is in the vector `v` at index `i`.
Otherwise, returns `(false, 0)`.
Disclaimer: This function may be costly. Use it at your own discretion.

```move
module 0x1::smart_vector {
    public fun index_of<T>(v: &smart_vector::SmartVector<T>, val: &T): (bool, u64)
}
```

<a id="0x1_smart_vector_contains"></a>

## Function `contains`

Return true if `val` is in the vector `v`.
Disclaimer: This function may be costly. Use it at your own discretion.

```move
module 0x1::smart_vector {
    public fun contains<T>(v: &smart_vector::SmartVector<T>, val: &T): bool
}
```

<a id="0x1_smart_vector_length"></a>

## Function `length`

Return the length of the vector.

```move
module 0x1::smart_vector {
    public fun length<T>(v: &smart_vector::SmartVector<T>): u64
}
```

<a id="0x1_smart_vector_is_empty"></a>

## Function `is_empty`

Return `true` if the vector `v` has no Ts and `false` otherwise.

```move
module 0x1::smart_vector {
    public fun is_empty<T>(v: &smart_vector::SmartVector<T>): bool
}
```

<a id="0x1_smart_vector_for_each"></a>

## Function `for_each`

Apply the function to each T in the vector, consuming it.

```move
module 0x1::smart_vector {
    public fun for_each<T: store>(v: smart_vector::SmartVector<T>, f: |T|)
}
```

<a id="0x1_smart_vector_for_each_reverse"></a>

## Function `for_each_reverse`

Apply the function to each T in the vector, consuming it.

```move
module 0x1::smart_vector {
    public fun for_each_reverse<T>(v: smart_vector::SmartVector<T>, f: |T|)
}
```

<a id="0x1_smart_vector_for_each_ref"></a>

## Function `for_each_ref`

Apply the function to a reference of each T in the vector.

```move
module 0x1::smart_vector {
    public fun for_each_ref<T>(v: &smart_vector::SmartVector<T>, f: |&T|)
}
```

<a id="0x1_smart_vector_for_each_mut"></a>

## Function `for_each_mut`

Apply the function to a mutable reference to each T in the vector.

```move
module 0x1::smart_vector {
    public fun for_each_mut<T>(v: &mut smart_vector::SmartVector<T>, f: |&mut T|)
}
```

<a id="0x1_smart_vector_enumerate_ref"></a>

## Function `enumerate_ref`

Apply the function to a reference of each T in the vector with its index.

```move
module 0x1::smart_vector {
    public fun enumerate_ref<T>(v: &smart_vector::SmartVector<T>, f: |(u64, &T)|)
}
```

<a id="0x1_smart_vector_enumerate_mut"></a>

## Function `enumerate_mut`

Apply the function to a mutable reference of each T in the vector with its index.

```move
module 0x1::smart_vector {
    public fun enumerate_mut<T>(v: &mut smart_vector::SmartVector<T>, f: |(u64, &mut T)|)
}
```

<a id="0x1_smart_vector_fold"></a>

## Function `fold`

Fold the function over the Ts. For example, `fold(vector[1,2,3], 0, f)` will execute
`f(f(f(0, 1), 2), 3)`

```move
module 0x1::smart_vector {
    public fun fold<Accumulator, T: store>(v: smart_vector::SmartVector<T>, init: Accumulator, f: |(Accumulator, T)|Accumulator): Accumulator
}
```

<a id="0x1_smart_vector_foldr"></a>

## Function `foldr`

Fold right like fold above but working right to left. For example, `fold(vector[1,2,3], 0, f)` will execute
`f(1, f(2, f(3, 0)))`

```move
module 0x1::smart_vector {
    public fun foldr<Accumulator, T>(v: smart_vector::SmartVector<T>, init: Accumulator, f: |(T, Accumulator)|Accumulator): Accumulator
}
```

<a id="0x1_smart_vector_map_ref"></a>

## Function `map_ref`

Map the function over the references of the Ts of the vector, producing a new vector without modifying the
original vector.

```move
module 0x1::smart_vector {
    public fun map_ref<T1, T2: store>(v: &smart_vector::SmartVector<T1>, f: |&T1|T2): smart_vector::SmartVector<T2>
}
```

<a id="0x1_smart_vector_map"></a>

## Function `map`

Map the function over the Ts of the vector, producing a new vector.

```move
module 0x1::smart_vector {
    public fun map<T1: store, T2: store>(v: smart_vector::SmartVector<T1>, f: |T1|T2): smart_vector::SmartVector<T2>
}
```

<a id="0x1_smart_vector_filter"></a>

## Function `filter`

Filter the vector using the boolean function, removing all Ts for which `p(e)` is not true.

```move
module 0x1::smart_vector {
    public fun filter<T: drop, store>(v: smart_vector::SmartVector<T>, p: |&T|bool): smart_vector::SmartVector<T>
}
```

<a id="0x1_smart_vector_zip"></a>

## Function `zip`

```move
module 0x1::smart_vector {
    public fun zip<T1: store, T2: store>(v1: smart_vector::SmartVector<T1>, v2: smart_vector::SmartVector<T2>, f: |(T1, T2)|)
}
```

<a id="0x1_smart_vector_zip_reverse"></a>

## Function `zip_reverse`

Apply the function to each pair of elements in the two given vectors in the reverse order, consuming them.
This errors out if the vectors are not of the same length.

```move
module 0x1::smart_vector {
    public fun zip_reverse<T1, T2>(v1: smart_vector::SmartVector<T1>, v2: smart_vector::SmartVector<T2>, f: |(T1, T2)|)
}
```

<a id="0x1_smart_vector_zip_ref"></a>

## Function `zip_ref`

Apply the function to the references of each pair of elements in the two given vectors.
This errors out if the vectors are not of the same length.

```move
module 0x1::smart_vector {
    public fun zip_ref<T1, T2>(v1: &smart_vector::SmartVector<T1>, v2: &smart_vector::SmartVector<T2>, f: |(&T1, &T2)|)
}
```

<a id="0x1_smart_vector_zip_mut"></a>

## Function `zip_mut`

Apply the function to mutable references to each pair of elements in the two given vectors.
This errors out if the vectors are not of the same length.

```move
module 0x1::smart_vector {
    public fun zip_mut<T1, T2>(v1: &mut smart_vector::SmartVector<T1>, v2: &mut smart_vector::SmartVector<T2>, f: |(&mut T1, &mut T2)|)
}
```

<a id="0x1_smart_vector_zip_map"></a>

## Function `zip_map`

Map the function over the element pairs of the two vectors, producing a new vector.

```move
module 0x1::smart_vector {
    public fun zip_map<T1: store, T2: store, NewT: store>(v1: smart_vector::SmartVector<T1>, v2: smart_vector::SmartVector<T2>, f: |(T1, T2)|NewT): smart_vector::SmartVector<NewT>
}
```

<a id="0x1_smart_vector_zip_map_ref"></a>

## Function `zip_map_ref`

Map the function over the references of the element pairs of two vectors, producing a new vector from the return
values without modifying the original vectors.

```move
module 0x1::smart_vector {
    public fun zip_map_ref<T1, T2, NewT: store>(v1: &smart_vector::SmartVector<T1>, v2: &smart_vector::SmartVector<T2>, f: |(&T1, &T2)|NewT): smart_vector::SmartVector<NewT>
}
```
