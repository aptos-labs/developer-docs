<a id="0x1_vector"></a>

# Module `0x1::vector`

A variable&#45;sized container that can hold any type. Indexing is 0&#45;based, and
vectors are growable. This module has many native functions.
Verification of modules that use this one uses model functions that are implemented
directly in Boogie. The specification language has built&#45;in functions operations such
as `singleton_vector`. There are some helper functions defined here for specifications in other
modules as well.

&gt;Note: We did not verify most of the
Move functions here because many have loops, requiring loop invariants to prove, and
the return on investment didn&apos;t seem worth it for these simple functions.

- [Constants](#@Constants_0)
- [Function `empty`](#0x1_vector_empty)
- [Function `length`](#0x1_vector_length)
- [Function `borrow`](#0x1_vector_borrow)
- [Function `push_back`](#0x1_vector_push_back)
- [Function `borrow_mut`](#0x1_vector_borrow_mut)
- [Function `pop_back`](#0x1_vector_pop_back)
- [Function `destroy_empty`](#0x1_vector_destroy_empty)
- [Function `swap`](#0x1_vector_swap)
- [Function `singleton`](#0x1_vector_singleton)
- [Function `reverse`](#0x1_vector_reverse)
- [Function `reverse_slice`](#0x1_vector_reverse_slice)
- [Function `append`](#0x1_vector_append)
- [Function `reverse_append`](#0x1_vector_reverse_append)
- [Function `trim`](#0x1_vector_trim)
- [Function `trim_reverse`](#0x1_vector_trim_reverse)
- [Function `is_empty`](#0x1_vector_is_empty)
- [Function `contains`](#0x1_vector_contains)
- [Function `index_of`](#0x1_vector_index_of)
- [Function `find`](#0x1_vector_find)
- [Function `insert`](#0x1_vector_insert)
- [Function `remove`](#0x1_vector_remove)
- [Function `remove_value`](#0x1_vector_remove_value)
- [Function `swap_remove`](#0x1_vector_swap_remove)
- [Function `for_each`](#0x1_vector_for_each)
- [Function `for_each_reverse`](#0x1_vector_for_each_reverse)
- [Function `for_each_ref`](#0x1_vector_for_each_ref)
- [Function `zip`](#0x1_vector_zip)
- [Function `zip_reverse`](#0x1_vector_zip_reverse)
- [Function `zip_ref`](#0x1_vector_zip_ref)
- [Function `enumerate_ref`](#0x1_vector_enumerate_ref)
- [Function `for_each_mut`](#0x1_vector_for_each_mut)
- [Function `zip_mut`](#0x1_vector_zip_mut)
- [Function `enumerate_mut`](#0x1_vector_enumerate_mut)
- [Function `fold`](#0x1_vector_fold)
- [Function `foldr`](#0x1_vector_foldr)
- [Function `map_ref`](#0x1_vector_map_ref)
- [Function `zip_map_ref`](#0x1_vector_zip_map_ref)
- [Function `map`](#0x1_vector_map)
- [Function `zip_map`](#0x1_vector_zip_map)
- [Function `filter`](#0x1_vector_filter)
- [Function `partition`](#0x1_vector_partition)
- [Function `rotate`](#0x1_vector_rotate)
- [Function `rotate_slice`](#0x1_vector_rotate_slice)
- [Function `stable_partition`](#0x1_vector_stable_partition)
- [Function `any`](#0x1_vector_any)
- [Function `all`](#0x1_vector_all)
- [Function `destroy`](#0x1_vector_destroy)
- [Function `range`](#0x1_vector_range)
- [Function `range_with_step`](#0x1_vector_range_with_step)
- [Function `slice`](#0x1_vector_slice)

```move
module 0x1::vector {
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_vector_EINDEX_OUT_OF_BOUNDS"></a>

The index into the vector is out of bounds

```move
module 0x1::vector {
    const EINDEX_OUT_OF_BOUNDS: u64 = 131072;
}
```

<a id="0x1_vector_EINVALID_RANGE"></a>

The index into the vector is out of bounds

```move
module 0x1::vector {
    const EINVALID_RANGE: u64 = 131073;
}
```

<a id="0x1_vector_EINVALID_SLICE_RANGE"></a>

The range in `slice` is invalid.

```move
module 0x1::vector {
    const EINVALID_SLICE_RANGE: u64 = 131076;
}
```

<a id="0x1_vector_EINVALID_STEP"></a>

The step provided in `range` is invalid, must be greater than zero.

```move
module 0x1::vector {
    const EINVALID_STEP: u64 = 131075;
}
```

<a id="0x1_vector_EVECTORS_LENGTH_MISMATCH"></a>

The length of the vectors are not equal.

```move
module 0x1::vector {
    const EVECTORS_LENGTH_MISMATCH: u64 = 131074;
}
```

<a id="0x1_vector_empty"></a>

## Function `empty`

Create an empty vector.

```move
module 0x1::vector {
    #[bytecode_instruction]
    public fun empty<Element>(): vector<Element>
}
```

<a id="0x1_vector_length"></a>

## Function `length`

Return the length of the vector.

```move
module 0x1::vector {
    #[bytecode_instruction]
    public fun length<Element>(v: &vector<Element>): u64
}
```

<a id="0x1_vector_borrow"></a>

## Function `borrow`

Acquire an immutable reference to the `i`th element of the vector `v`.
Aborts if `i` is out of bounds.

```move
module 0x1::vector {
    #[bytecode_instruction]
    public fun borrow<Element>(v: &vector<Element>, i: u64): &Element
}
```

<a id="0x1_vector_push_back"></a>

## Function `push_back`

Add element `e` to the end of the vector `v`.

```move
module 0x1::vector {
    #[bytecode_instruction]
    public fun push_back<Element>(v: &mut vector<Element>, e: Element)
}
```

<a id="0x1_vector_borrow_mut"></a>

## Function `borrow_mut`

Return a mutable reference to the `i`th element in the vector `v`.
Aborts if `i` is out of bounds.

```move
module 0x1::vector {
    #[bytecode_instruction]
    public fun borrow_mut<Element>(v: &mut vector<Element>, i: u64): &mut Element
}
```

<a id="0x1_vector_pop_back"></a>

## Function `pop_back`

Pop an element from the end of vector `v`.
Aborts if `v` is empty.

```move
module 0x1::vector {
    #[bytecode_instruction]
    public fun pop_back<Element>(v: &mut vector<Element>): Element
}
```

<a id="0x1_vector_destroy_empty"></a>

## Function `destroy_empty`

Destroy the vector `v`.
Aborts if `v` is not empty.

```move
module 0x1::vector {
    #[bytecode_instruction]
    public fun destroy_empty<Element>(v: vector<Element>)
}
```

<a id="0x1_vector_swap"></a>

## Function `swap`

Swaps the elements at the `i`th and `j`th indices in the vector `v`.
Aborts if `i` or `j` is out of bounds.

```move
module 0x1::vector {
    #[bytecode_instruction]
    public fun swap<Element>(v: &mut vector<Element>, i: u64, j: u64)
}
```

<a id="0x1_vector_singleton"></a>

## Function `singleton`

Return an vector of size one containing element `e`.

```move
module 0x1::vector {
    public fun singleton<Element>(e: Element): vector<Element>
}
```

<a id="0x1_vector_reverse"></a>

## Function `reverse`

Reverses the order of the elements in the vector `v` in place.

```move
module 0x1::vector {
    public fun reverse<Element>(v: &mut vector<Element>)
}
```

<a id="0x1_vector_reverse_slice"></a>

## Function `reverse_slice`

Reverses the order of the elements [left, right) in the vector `v` in place.

```move
module 0x1::vector {
    public fun reverse_slice<Element>(v: &mut vector<Element>, left: u64, right: u64)
}
```

<a id="0x1_vector_append"></a>

## Function `append`

Pushes all of the elements of the `other` vector into the `lhs` vector.

```move
module 0x1::vector {
    public fun append<Element>(lhs: &mut vector<Element>, other: vector<Element>)
}
```

<a id="0x1_vector_reverse_append"></a>

## Function `reverse_append`

Pushes all of the elements of the `other` vector into the `lhs` vector.

```move
module 0x1::vector {
    public fun reverse_append<Element>(lhs: &mut vector<Element>, other: vector<Element>)
}
```

<a id="0x1_vector_trim"></a>

## Function `trim`

Trim a vector to a smaller size, returning the evicted elements in order

```move
module 0x1::vector {
    public fun trim<Element>(v: &mut vector<Element>, new_len: u64): vector<Element>
}
```

<a id="0x1_vector_trim_reverse"></a>

## Function `trim_reverse`

Trim a vector to a smaller size, returning the evicted elements in reverse order

```move
module 0x1::vector {
    public fun trim_reverse<Element>(v: &mut vector<Element>, new_len: u64): vector<Element>
}
```

<a id="0x1_vector_is_empty"></a>

## Function `is_empty`

Return `true` if the vector `v` has no elements and `false` otherwise.

```move
module 0x1::vector {
    public fun is_empty<Element>(v: &vector<Element>): bool
}
```

<a id="0x1_vector_contains"></a>

## Function `contains`

Return true if `e` is in the vector `v`.

```move
module 0x1::vector {
    public fun contains<Element>(v: &vector<Element>, e: &Element): bool
}
```

<a id="0x1_vector_index_of"></a>

## Function `index_of`

Return `(true, i)` if `e` is in the vector `v` at index `i`.
Otherwise, returns `(false, 0)`.

```move
module 0x1::vector {
    public fun index_of<Element>(v: &vector<Element>, e: &Element): (bool, u64)
}
```

<a id="0x1_vector_find"></a>

## Function `find`

Return `(true, i)` if there&apos;s an element that matches the predicate. If there are multiple elements that match
the predicate, only the index of the first one is returned.
Otherwise, returns `(false, 0)`.

```move
module 0x1::vector {
    public fun find<Element>(v: &vector<Element>, f: |&Element|bool): (bool, u64)
}
```

<a id="0x1_vector_insert"></a>

## Function `insert`

Insert a new element at position 0 &lt;&#61; i &lt;&#61; length, using O(length &#45; i) time.
Aborts if out of bounds.

```move
module 0x1::vector {
    public fun insert<Element>(v: &mut vector<Element>, i: u64, e: Element)
}
```

<a id="0x1_vector_remove"></a>

## Function `remove`

Remove the `i`th element of the vector `v`, shifting all subsequent elements.
This is O(n) and preserves ordering of elements in the vector.
Aborts if `i` is out of bounds.

```move
module 0x1::vector {
    public fun remove<Element>(v: &mut vector<Element>, i: u64): Element
}
```

<a id="0x1_vector_remove_value"></a>

## Function `remove_value`

Remove the first occurrence of a given value in the vector `v` and return it in a vector, shifting all
subsequent elements.
This is O(n) and preserves ordering of elements in the vector.
This returns an empty vector if the value isn&apos;t present in the vector.
Note that this cannot return an option as option uses vector and there&apos;d be a circular dependency between option
and vector.

```move
module 0x1::vector {
    public fun remove_value<Element>(v: &mut vector<Element>, val: &Element): vector<Element>
}
```

<a id="0x1_vector_swap_remove"></a>

## Function `swap_remove`

Swap the `i`th element of the vector `v` with the last element and then pop the vector.
This is O(1), but does not preserve ordering of elements in the vector.
Aborts if `i` is out of bounds.

```move
module 0x1::vector {
    public fun swap_remove<Element>(v: &mut vector<Element>, i: u64): Element
}
```

<a id="0x1_vector_for_each"></a>

## Function `for_each`

Apply the function to each element in the vector, consuming it.

```move
module 0x1::vector {
    public fun for_each<Element>(v: vector<Element>, f: |Element|)
}
```

<a id="0x1_vector_for_each_reverse"></a>

## Function `for_each_reverse`

Apply the function to each element in the vector, consuming it.

```move
module 0x1::vector {
    public fun for_each_reverse<Element>(v: vector<Element>, f: |Element|)
}
```

<a id="0x1_vector_for_each_ref"></a>

## Function `for_each_ref`

Apply the function to a reference of each element in the vector.

```move
module 0x1::vector {
    public fun for_each_ref<Element>(v: &vector<Element>, f: |&Element|)
}
```

<a id="0x1_vector_zip"></a>

## Function `zip`

Apply the function to each pair of elements in the two given vectors, consuming them.

```move
module 0x1::vector {
    public fun zip<Element1, Element2>(v1: vector<Element1>, v2: vector<Element2>, f: |(Element1, Element2)|)
}
```

<a id="0x1_vector_zip_reverse"></a>

## Function `zip_reverse`

Apply the function to each pair of elements in the two given vectors in the reverse order, consuming them.
This errors out if the vectors are not of the same length.

```move
module 0x1::vector {
    public fun zip_reverse<Element1, Element2>(v1: vector<Element1>, v2: vector<Element2>, f: |(Element1, Element2)|)
}
```

<a id="0x1_vector_zip_ref"></a>

## Function `zip_ref`

Apply the function to the references of each pair of elements in the two given vectors.
This errors out if the vectors are not of the same length.

```move
module 0x1::vector {
    public fun zip_ref<Element1, Element2>(v1: &vector<Element1>, v2: &vector<Element2>, f: |(&Element1, &Element2)|)
}
```

<a id="0x1_vector_enumerate_ref"></a>

## Function `enumerate_ref`

Apply the function to a reference of each element in the vector with its index.

```move
module 0x1::vector {
    public fun enumerate_ref<Element>(v: &vector<Element>, f: |(u64, &Element)|)
}
```

<a id="0x1_vector_for_each_mut"></a>

## Function `for_each_mut`

Apply the function to a mutable reference to each element in the vector.

```move
module 0x1::vector {
    public fun for_each_mut<Element>(v: &mut vector<Element>, f: |&mut Element|)
}
```

<a id="0x1_vector_zip_mut"></a>

## Function `zip_mut`

Apply the function to mutable references to each pair of elements in the two given vectors.
This errors out if the vectors are not of the same length.

```move
module 0x1::vector {
    public fun zip_mut<Element1, Element2>(v1: &mut vector<Element1>, v2: &mut vector<Element2>, f: |(&mut Element1, &mut Element2)|)
}
```

<a id="0x1_vector_enumerate_mut"></a>

## Function `enumerate_mut`

Apply the function to a mutable reference of each element in the vector with its index.

```move
module 0x1::vector {
    public fun enumerate_mut<Element>(v: &mut vector<Element>, f: |(u64, &mut Element)|)
}
```

<a id="0x1_vector_fold"></a>

## Function `fold`

Fold the function over the elements. For example, `fold(vector[1,2,3], 0, f)` will execute
`f(f(f(0, 1), 2), 3)`

```move
module 0x1::vector {
    public fun fold<Accumulator, Element>(v: vector<Element>, init: Accumulator, f: |(Accumulator, Element)|Accumulator): Accumulator
}
```

<a id="0x1_vector_foldr"></a>

## Function `foldr`

Fold right like fold above but working right to left. For example, `fold(vector[1,2,3], 0, f)` will execute
`f(1, f(2, f(3, 0)))`

```move
module 0x1::vector {
    public fun foldr<Accumulator, Element>(v: vector<Element>, init: Accumulator, f: |(Element, Accumulator)|Accumulator): Accumulator
}
```

<a id="0x1_vector_map_ref"></a>

## Function `map_ref`

Map the function over the references of the elements of the vector, producing a new vector without modifying the
original vector.

```move
module 0x1::vector {
    public fun map_ref<Element, NewElement>(v: &vector<Element>, f: |&Element|NewElement): vector<NewElement>
}
```

<a id="0x1_vector_zip_map_ref"></a>

## Function `zip_map_ref`

Map the function over the references of the element pairs of two vectors, producing a new vector from the return
values without modifying the original vectors.

```move
module 0x1::vector {
    public fun zip_map_ref<Element1, Element2, NewElement>(v1: &vector<Element1>, v2: &vector<Element2>, f: |(&Element1, &Element2)|NewElement): vector<NewElement>
}
```

<a id="0x1_vector_map"></a>

## Function `map`

Map the function over the elements of the vector, producing a new vector.

```move
module 0x1::vector {
    public fun map<Element, NewElement>(v: vector<Element>, f: |Element|NewElement): vector<NewElement>
}
```

<a id="0x1_vector_zip_map"></a>

## Function `zip_map`

Map the function over the element pairs of the two vectors, producing a new vector.

```move
module 0x1::vector {
    public fun zip_map<Element1, Element2, NewElement>(v1: vector<Element1>, v2: vector<Element2>, f: |(Element1, Element2)|NewElement): vector<NewElement>
}
```

<a id="0x1_vector_filter"></a>

## Function `filter`

Filter the vector using the boolean function, removing all elements for which `p(e)` is not true.

```move
module 0x1::vector {
    public fun filter<Element: drop>(v: vector<Element>, p: |&Element|bool): vector<Element>
}
```

<a id="0x1_vector_partition"></a>

## Function `partition`

Partition, sorts all elements for which pred is true to the front.
Preserves the relative order of the elements for which pred is true,
BUT NOT for the elements for which pred is false.

```move
module 0x1::vector {
    public fun partition<Element>(v: &mut vector<Element>, pred: |&Element|bool): u64
}
```

<a id="0x1_vector_rotate"></a>

## Function `rotate`

rotate(&amp;mut [1, 2, 3, 4, 5], 2) &#45;&gt; [3, 4, 5, 1, 2] in place, returns the split point
ie. 3 in the example above

```move
module 0x1::vector {
    public fun rotate<Element>(v: &mut vector<Element>, rot: u64): u64
}
```

<a id="0x1_vector_rotate_slice"></a>

## Function `rotate_slice`

Same as above but on a sub&#45;slice of an array [left, right) with left &lt;&#61; rot &lt;&#61; right
returns the

```move
module 0x1::vector {
    public fun rotate_slice<Element>(v: &mut vector<Element>, left: u64, rot: u64, right: u64): u64
}
```

<a id="0x1_vector_stable_partition"></a>

## Function `stable_partition`

Partition the array based on a predicate p, this routine is stable and thus
preserves the relative order of the elements in the two partitions.

```move
module 0x1::vector {
    public fun stable_partition<Element>(v: &mut vector<Element>, p: |&Element|bool): u64
}
```

<a id="0x1_vector_any"></a>

## Function `any`

Return true if any element in the vector satisfies the predicate.

```move
module 0x1::vector {
    public fun any<Element>(v: &vector<Element>, p: |&Element|bool): bool
}
```

<a id="0x1_vector_all"></a>

## Function `all`

Return true if all elements in the vector satisfy the predicate.

```move
module 0x1::vector {
    public fun all<Element>(v: &vector<Element>, p: |&Element|bool): bool
}
```

<a id="0x1_vector_destroy"></a>

## Function `destroy`

Destroy a vector, just a wrapper around for_each_reverse with a descriptive name
when used in the context of destroying a vector.

```move
module 0x1::vector {
    public fun destroy<Element>(v: vector<Element>, d: |Element|)
}
```

<a id="0x1_vector_range"></a>

## Function `range`

```move
module 0x1::vector {
    public fun range(start: u64, end: u64): vector<u64>
}
```

<a id="0x1_vector_range_with_step"></a>

## Function `range_with_step`

```move
module 0x1::vector {
    public fun range_with_step(start: u64, end: u64, step: u64): vector<u64>
}
```

<a id="0x1_vector_slice"></a>

## Function `slice`

```move
module 0x1::vector {
    public fun slice<Element: copy>(v: &vector<Element>, start: u64, end: u64): vector<Element>
}
```
