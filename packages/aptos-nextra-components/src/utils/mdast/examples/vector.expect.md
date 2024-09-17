<a id="0x1_vector"></a>

# Module `0x1::vector`

A variable-sized container that can hold any type. Indexing is 0-based, and
vectors are growable. This module has many native functions.
Verification of modules that use this one uses model functions that are implemented
directly in Boogie. The specification language has built-in functions operations such
as <code>singleton_vector</code>. There are some helper functions defined here for specifications in other
modules as well.

> Note: We did not verify most of the
> Move functions here because many have loops, requiring loop invariants to prove, and
> the return on investment didn't seem worth it for these simple functions.

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
- [Specification](#@Specification_1)
  - [Helper Functions](#@Helper_Functions_2)
  - [Function `singleton`](#@Specification_1_singleton)
  - [Function `reverse`](#@Specification_1_reverse)
  - [Function `reverse_slice`](#@Specification_1_reverse_slice)
  - [Function `append`](#@Specification_1_append)
  - [Function `reverse_append`](#@Specification_1_reverse_append)
  - [Function `trim`](#@Specification_1_trim)
  - [Function `trim_reverse`](#@Specification_1_trim_reverse)
  - [Function `is_empty`](#@Specification_1_is_empty)
  - [Function `contains`](#@Specification_1_contains)
  - [Function `index_of`](#@Specification_1_index_of)
  - [Function `insert`](#@Specification_1_insert)
  - [Function `remove`](#@Specification_1_remove)
  - [Function `remove_value`](#@Specification_1_remove_value)
  - [Function `swap_remove`](#@Specification_1_swap_remove)
  - [Function `rotate`](#@Specification_1_rotate)
  - [Function `rotate_slice`](#@Specification_1_rotate_slice)

```move

```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_vector_EINDEX_OUT_OF_BOUNDS"></a>

The index into the vector is out of bounds

```move
const EINDEX_OUT_OF_BOUNDS: u64 = 131072;
```

<a id="0x1_vector_EINVALID_RANGE"></a>

The index into the vector is out of bounds

```move
const EINVALID_RANGE: u64 = 131073;
```

<a id="0x1_vector_EINVALID_SLICE_RANGE"></a>

The range in <code>slice</code> is invalid.

```move
const EINVALID_SLICE_RANGE: u64 = 131076;
```

<a id="0x1_vector_EINVALID_STEP"></a>

The step provided in <code>range</code> is invalid, must be greater than zero.

```move
const EINVALID_STEP: u64 = 131075;
```

<a id="0x1_vector_EVECTORS_LENGTH_MISMATCH"></a>

The length of the vectors are not equal.

```move
const EVECTORS_LENGTH_MISMATCH: u64 = 131074;
```

<a id="0x1_vector_empty"></a>

## Function `empty`

Create an empty vector.

```move
#[bytecode_instruction]
public fun empty<Element>(): vector<Element>
```

<details>
<summary>Implementation</summary>

```move
native public fun empty<Element>(): vector<Element>;
```

</details>

<a id="0x1_vector_length"></a>

## Function `length`

Return the length of the vector.

```move
#[bytecode_instruction]
public fun length<Element>(self: &vector<Element>): u64
```

<details>
<summary>Implementation</summary>

```move
native public fun length<Element>(self: &vector<Element>): u64;
```

</details>

<a id="0x1_vector_borrow"></a>

## Function `borrow`

Acquire an immutable reference to the <code>i</code>th element of the vector <code>self</code>.
Aborts if <code>i</code> is out of bounds.

```move
#[bytecode_instruction]
public fun borrow<Element>(self: &vector<Element>, i: u64): &Element
```

<details>
<summary>Implementation</summary>

```move
native public fun borrow<Element>(self: &vector<Element>, i: u64): &Element;
```

</details>

<a id="0x1_vector_push_back"></a>

## Function `push_back`

Add element <code>e</code> to the end of the vector <code>self</code>.

```move
#[bytecode_instruction]
public fun push_back<Element>(self: &mut vector<Element>, e: Element)
```

<details>
<summary>Implementation</summary>

```move
native public fun push_back<Element>(self: &mut vector<Element>, e: Element);
```

</details>

<a id="0x1_vector_borrow_mut"></a>

## Function `borrow_mut`

Return a mutable reference to the <code>i</code>th element in the vector <code>self</code>.
Aborts if <code>i</code> is out of bounds.

```move
#[bytecode_instruction]
public fun borrow_mut<Element>(self: &mut vector<Element>, i: u64): &mut Element
```

<details>
<summary>Implementation</summary>

```move
native public fun borrow_mut<Element>(self: &mut vector<Element>, i: u64): &mut Element;
```

</details>

<a id="0x1_vector_pop_back"></a>

## Function `pop_back`

Pop an element from the end of vector <code>self</code>.
Aborts if <code>self</code> is empty.

```move
#[bytecode_instruction]
public fun pop_back<Element>(self: &mut vector<Element>): Element
```

<details>
<summary>Implementation</summary>

```move
native public fun pop_back<Element>(self: &mut vector<Element>): Element;
```

</details>

<a id="0x1_vector_destroy_empty"></a>

## Function `destroy_empty`

Destroy the vector <code>self</code>.
Aborts if <code>self</code> is not empty.

```move
#[bytecode_instruction]
public fun destroy_empty<Element>(self: vector<Element>)
```

<details>
<summary>Implementation</summary>

```move
native public fun destroy_empty<Element>(self: vector<Element>);
```

</details>

<a id="0x1_vector_swap"></a>

## Function `swap`

Swaps the elements at the <code>i</code>th and <code>j</code>th indices in the vector <code>self</code>.
Aborts if <code>i</code> or <code>j</code> is out of bounds.

```move
#[bytecode_instruction]
public fun swap<Element>(self: &mut vector<Element>, i: u64, j: u64)
```

<details>
<summary>Implementation</summary>

```move
native public fun swap<Element>(self: &mut vector<Element>, i: u64, j: u64);
```

</details>

<a id="0x1_vector_singleton"></a>

## Function `singleton`

Return an vector of size one containing element <code>e</code>.

```move
public fun singleton<Element>(e: Element): vector<Element>
```

<details>
<summary>Implementation</summary>

```move
public fun singleton<Element>(e: Element): vector<Element> {
    let v = empty();
    push_back(&mut v, e);
    v
}
```

</details>

<a id="0x1_vector_reverse"></a>

## Function `reverse`

Reverses the order of the elements in the vector <code>self</code> in place.

```move
public fun reverse<Element>(self: &mut vector<Element>)
```

<details>
<summary>Implementation</summary>

```move
public fun reverse<Element>(self: &mut vector<Element>) {
    let len = length(self);
    reverse_slice(self, 0, len);
}
```

</details>

<a id="0x1_vector_reverse_slice"></a>

## Function `reverse_slice`

Reverses the order of the elements \[left, right) in the vector <code>self</code> in place.

```move
public fun reverse_slice<Element>(self: &mut vector<Element>, left: u64, right: u64)
```

<details>
<summary>Implementation</summary>

```move
public fun reverse_slice<Element>(self: &mut vector<Element>, left: u64, right: u64) {
    assert!(left <= right, EINVALID_RANGE);
    if (left == right) return;
    right = right - 1;
    while (left < right) {
        swap(self, left, right);
        left = left + 1;
        right = right - 1;
    }
}
```

</details>

<a id="0x1_vector_append"></a>

## Function `append`

Pushes all of the elements of the <code>other</code> vector into the <code>self</code> vector.

```move
public fun append<Element>(self: &mut vector<Element>, other: vector<Element>)
```

<details>
<summary>Implementation</summary>

```move
public fun append<Element>(self: &mut vector<Element>, other: vector<Element>) {
    reverse(&mut other);
    reverse_append(self, other);
}
```

</details>

<a id="0x1_vector_reverse_append"></a>

## Function `reverse_append`

Pushes all of the elements of the <code>other</code> vector into the <code>self</code> vector.

```move
public fun reverse_append<Element>(self: &mut vector<Element>, other: vector<Element>)
```

<details>
<summary>Implementation</summary>

```move
public fun reverse_append<Element>(self: &mut vector<Element>, other: vector<Element>) {
    let len = length(&other);
    while (len > 0) {
        push_back(self, pop_back(&mut other));
        len = len - 1;
    };
    destroy_empty(other);
}
```

</details>

<a id="0x1_vector_trim"></a>

## Function `trim`

Trim a vector to a smaller size, returning the evicted elements in order

```move
public fun trim<Element>(self: &mut vector<Element>, new_len: u64): vector<Element>
```

<details>
<summary>Implementation</summary>

```move
public fun trim<Element>(self: &mut vector<Element>, new_len: u64): vector<Element> {
    let res = trim_reverse(self, new_len);
    reverse(&mut res);
    res
}
```

</details>

<a id="0x1_vector_trim_reverse"></a>

## Function `trim_reverse`

Trim a vector to a smaller size, returning the evicted elements in reverse order

```move
public fun trim_reverse<Element>(self: &mut vector<Element>, new_len: u64): vector<Element>
```

<details>
<summary>Implementation</summary>

```move
public fun trim_reverse<Element>(self: &mut vector<Element>, new_len: u64): vector<Element> {
    let len = length(self);
    assert!(new_len <= len, EINDEX_OUT_OF_BOUNDS);
    let result = empty();
    while (new_len < len) {
        push_back(&mut result, pop_back(self));
        len = len - 1;
    };
    result
}
```

</details>

<a id="0x1_vector_is_empty"></a>

## Function `is_empty`

Return <code><b>true</b></code> if the vector <code>self</code> has no elements and <code><b>false</b></code> otherwise.

```move
public fun is_empty<Element>(self: &vector<Element>): bool
```

<details>
<summary>Implementation</summary>

```move
public fun is_empty<Element>(self: &vector<Element>): bool {
    length(self) == 0
}
```

</details>

<a id="0x1_vector_contains"></a>

## Function `contains`

Return true if <code>e</code> is in the vector <code>self</code>.

```move
public fun contains<Element>(self: &vector<Element>, e: &Element): bool
```

<details>
<summary>Implementation</summary>

```move
public fun contains<Element>(self: &vector<Element>, e: &Element): bool {
    let i = 0;
    let len = length(self);
    while (i < len) {
        if (borrow(self, i) == e) return true;
        i = i + 1;
    };
    false
}
```

</details>

<a id="0x1_vector_index_of"></a>

## Function `index_of`

Return <code>(<b>true</b>, i)</code> if <code>e</code> is in the vector <code>self</code> at index <code>i</code>.
Otherwise, returns <code>(<b>false</b>, 0)</code>.

```move
public fun index_of<Element>(self: &vector<Element>, e: &Element): (bool, u64)
```

<details>
<summary>Implementation</summary>

```move
public fun index_of<Element>(self: &vector<Element>, e: &Element): (bool, u64) {
    let i = 0;
    let len = length(self);
    while (i < len) {
        if (borrow(self, i) == e) return (true, i);
        i = i + 1;
    };
    (false, 0)
}
```

</details>

<a id="0x1_vector_find"></a>

## Function `find`

Return <code>(<b>true</b>, i)</code> if there's an element that matches the predicate. If there are multiple elements that match
the predicate, only the index of the first one is returned.
Otherwise, returns <code>(<b>false</b>, 0)</code>.

```move
public fun find<Element>(self: &vector<Element>, f: |&Element|bool): (bool, u64)
```

<details>
<summary>Implementation</summary>

```move
public inline fun find<Element>(self: &vector<Element>, f: |&Element|bool): (bool, u64) {
    let find = false;
    let found_index = 0;
    let i = 0;
    let len = length(self);
    while (i < len) {
        // Cannot call return in an inline function so we need to resort to break here.
        if (f(borrow(self, i))) {
            find = true;
            found_index = i;
            break
        };
        i = i + 1;
    };
    (find, found_index)
}
```

</details>

<a id="0x1_vector_insert"></a>

## Function `insert`

Insert a new element at position 0 &lt;= i &lt;= length, using O(length - i) time.
Aborts if out of bounds.

```move
public fun insert<Element>(self: &mut vector<Element>, i: u64, e: Element)
```

<details>
<summary>Implementation</summary>

```move
public fun insert<Element>(self: &mut vector<Element>, i: u64, e: Element) {
    let len = length(self);
    assert!(i <= len, EINDEX_OUT_OF_BOUNDS);
    push_back(self, e);
    while (i < len) {
        swap(self, i, len);
        i = i + 1;
    };
}
```

</details>

<a id="0x1_vector_remove"></a>

## Function `remove`

Remove the <code>i</code>th element of the vector <code>self</code>, shifting all subsequent elements.
This is O(n) and preserves ordering of elements in the vector.
Aborts if <code>i</code> is out of bounds.

```move
public fun remove<Element>(self: &mut vector<Element>, i: u64): Element
```

<details>
<summary>Implementation</summary>

```move
public fun remove<Element>(self: &mut vector<Element>, i: u64): Element {
    let len = length(self);
    // i out of bounds; abort
    if (i >= len) abort EINDEX_OUT_OF_BOUNDS;

    len = len - 1;
    while (i < len) swap(self, i, { i = i + 1; i });
    pop_back(self)
}
```

</details>

<a id="0x1_vector_remove_value"></a>

## Function `remove_value`

Remove the first occurrence of a given value in the vector <code>self</code> and return it in a vector, shifting all
subsequent elements.
This is O(n) and preserves ordering of elements in the vector.
This returns an empty vector if the value isn't present in the vector.
Note that this cannot return an option as option uses vector and there'd be a circular dependency between option
and vector.

```move
public fun remove_value<Element>(self: &mut vector<Element>, val: &Element): vector<Element>
```

<details>
<summary>Implementation</summary>

```move
public fun remove_value<Element>(self: &mut vector<Element>, val: &Element): vector<Element> {
    // This doesn't cost a O(2N) run time as index_of scans from left to right and stops when the element is found,
    // while remove would continue from the identified index to the end of the vector.
    let (found, index) = index_of(self, val);
    if (found) {
        vector[remove(self, index)]
    } else {
       vector[]
    }
}
```

</details>

<a id="0x1_vector_swap_remove"></a>

## Function `swap_remove`

Swap the <code>i</code>th element of the vector <code>self</code> with the last element and then pop the vector.
This is O(1), but does not preserve ordering of elements in the vector.
Aborts if <code>i</code> is out of bounds.

```move
public fun swap_remove<Element>(self: &mut vector<Element>, i: u64): Element
```

<details>
<summary>Implementation</summary>

```move
public fun swap_remove<Element>(self: &mut vector<Element>, i: u64): Element {
    assert!(!is_empty(self), EINDEX_OUT_OF_BOUNDS);
    let last_idx = length(self) - 1;
    swap(self, i, last_idx);
    pop_back(self)
}
```

</details>

<a id="0x1_vector_for_each"></a>

## Function `for_each`

Apply the function to each element in the vector, consuming it.

```move
public fun for_each<Element>(self: vector<Element>, f: |Element|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun for_each<Element>(self: vector<Element>, f: |Element|) {
    reverse(&mut self); // We need to reverse the vector to consume it efficiently
    for_each_reverse(self, |e| f(e));
}
```

</details>

<a id="0x1_vector_for_each_reverse"></a>

## Function `for_each_reverse`

Apply the function to each element in the vector, consuming it.

```move
public fun for_each_reverse<Element>(self: vector<Element>, f: |Element|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun for_each_reverse<Element>(self: vector<Element>, f: |Element|) {
    let len = length(&self);
    while (len > 0) {
        f(pop_back(&mut self));
        len = len - 1;
    };
    destroy_empty(self)
}
```

</details>

<a id="0x1_vector_for_each_ref"></a>

## Function `for_each_ref`

Apply the function to a reference of each element in the vector.

```move
public fun for_each_ref<Element>(self: &vector<Element>, f: |&Element|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun for_each_ref<Element>(self: &vector<Element>, f: |&Element|) {
    let i = 0;
    let len = length(self);
    while (i < len) {
        f(borrow(self, i));
        i = i + 1
    }
}
```

</details>

<a id="0x1_vector_zip"></a>

## Function `zip`

Apply the function to each pair of elements in the two given vectors, consuming them.

```move
public fun zip<Element1, Element2>(self: vector<Element1>, v2: vector<Element2>, f: |(Element1, Element2)|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun zip<Element1, Element2>(self: vector<Element1>, v2: vector<Element2>, f: |Element1, Element2|) {
    // We need to reverse the vectors to consume it efficiently
    reverse(&mut self);
    reverse(&mut v2);
    zip_reverse(self, v2, |e1, e2| f(e1, e2));
}
```

</details>

<a id="0x1_vector_zip_reverse"></a>

## Function `zip_reverse`

Apply the function to each pair of elements in the two given vectors in the reverse order, consuming them.
This errors out if the vectors are not of the same length.

```move
public fun zip_reverse<Element1, Element2>(self: vector<Element1>, v2: vector<Element2>, f: |(Element1, Element2)|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun zip_reverse<Element1, Element2>(
    self: vector<Element1>,
    v2: vector<Element2>,
    f: |Element1, Element2|,
) {
    let len = length(&self);
    // We can't use the constant EVECTORS_LENGTH_MISMATCH here as all calling code would then need to define it
    // due to how inline functions work.
    assert!(len == length(&v2), 0x20002);
    while (len > 0) {
        f(pop_back(&mut self), pop_back(&mut v2));
        len = len - 1;
    };
    destroy_empty(self);
    destroy_empty(v2);
}
```

</details>

<a id="0x1_vector_zip_ref"></a>

## Function `zip_ref`

Apply the function to the references of each pair of elements in the two given vectors.
This errors out if the vectors are not of the same length.

```move
public fun zip_ref<Element1, Element2>(self: &vector<Element1>, v2: &vector<Element2>, f: |(&Element1, &Element2)|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun zip_ref<Element1, Element2>(
    self: &vector<Element1>,
    v2: &vector<Element2>,
    f: |&Element1, &Element2|,
) {
    let len = length(self);
    // We can't use the constant EVECTORS_LENGTH_MISMATCH here as all calling code would then need to define it
    // due to how inline functions work.
    assert!(len == length(v2), 0x20002);
    let i = 0;
    while (i < len) {
        f(borrow(self, i), borrow(v2, i));
        i = i + 1
    }
}
```

</details>

<a id="0x1_vector_enumerate_ref"></a>

## Function `enumerate_ref`

Apply the function to a reference of each element in the vector with its index.

```move
public fun enumerate_ref<Element>(self: &vector<Element>, f: |(u64, &Element)|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun enumerate_ref<Element>(self: &vector<Element>, f: |u64, &Element|) {
    let i = 0;
    let len = length(self);
    while (i < len) {
        f(i, borrow(self, i));
        i = i + 1;
    };
}
```

</details>

<a id="0x1_vector_for_each_mut"></a>

## Function `for_each_mut`

Apply the function to a mutable reference to each element in the vector.

```move
public fun for_each_mut<Element>(self: &mut vector<Element>, f: |&mut Element|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun for_each_mut<Element>(self: &mut vector<Element>, f: |&mut Element|) {
    let i = 0;
    let len = length(self);
    while (i < len) {
        f(borrow_mut(self, i));
        i = i + 1
    }
}
```

</details>

<a id="0x1_vector_zip_mut"></a>

## Function `zip_mut`

Apply the function to mutable references to each pair of elements in the two given vectors.
This errors out if the vectors are not of the same length.

```move
public fun zip_mut<Element1, Element2>(self: &mut vector<Element1>, v2: &mut vector<Element2>, f: |(&mut Element1, &mut Element2)|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun zip_mut<Element1, Element2>(
    self: &mut vector<Element1>,
    v2: &mut vector<Element2>,
    f: |&mut Element1, &mut Element2|,
) {
    let i = 0;
    let len = length(self);
    // We can't use the constant EVECTORS_LENGTH_MISMATCH here as all calling code would then need to define it
    // due to how inline functions work.
    assert!(len == length(v2), 0x20002);
    while (i < len) {
        f(borrow_mut(self, i), borrow_mut(v2, i));
        i = i + 1
    }
}
```

</details>

<a id="0x1_vector_enumerate_mut"></a>

## Function `enumerate_mut`

Apply the function to a mutable reference of each element in the vector with its index.

```move
public fun enumerate_mut<Element>(self: &mut vector<Element>, f: |(u64, &mut Element)|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun enumerate_mut<Element>(self: &mut vector<Element>, f: |u64, &mut Element|) {
    let i = 0;
    let len = length(self);
    while (i < len) {
        f(i, borrow_mut(self, i));
        i = i + 1;
    };
}
```

</details>

<a id="0x1_vector_fold"></a>

## Function `fold`

Fold the function over the elements. For example, <code><a href="vector.md#0x1_vector_fold">fold</a>(<a href="vector.md#0x1_vector">vector</a>\[1,2,3], 0, f)</code> will execute <code>f(f(f(0, 1), 2), 3)</code>

```move
public fun fold<Accumulator, Element>(self: vector<Element>, init: Accumulator, f: |(Accumulator, Element)|Accumulator): Accumulator
```

<details>
<summary>Implementation</summary>

```move
public inline fun fold<Accumulator, Element>(
    self: vector<Element>,
    init: Accumulator,
    f: |Accumulator,Element|Accumulator
): Accumulator {
    let accu = init;
    for_each(self, |elem| accu = f(accu, elem));
    accu
}
```

</details>

<a id="0x1_vector_foldr"></a>

## Function `foldr`

Fold right like fold above but working right to left. For example, <code><a href="vector.md#0x1_vector_fold">fold</a>(<a href="vector.md#0x1_vector">vector</a>\[1,2,3], 0, f)</code> will execute <code>f(1, f(2, f(3, 0)))</code>

```move
public fun foldr<Accumulator, Element>(self: vector<Element>, init: Accumulator, f: |(Element, Accumulator)|Accumulator): Accumulator
```

<details>
<summary>Implementation</summary>

```move
public inline fun foldr<Accumulator, Element>(
    self: vector<Element>,
    init: Accumulator,
    f: |Element, Accumulator|Accumulator
): Accumulator {
    let accu = init;
    for_each_reverse(self, |elem| accu = f(elem, accu));
    accu
}
```

</details>

<a id="0x1_vector_map_ref"></a>

## Function `map_ref`

Map the function over the references of the elements of the vector, producing a new vector without modifying the
original vector.

```move
public fun map_ref<Element, NewElement>(self: &vector<Element>, f: |&Element|NewElement): vector<NewElement>
```

<details>
<summary>Implementation</summary>

```move
public inline fun map_ref<Element, NewElement>(
    self: &vector<Element>,
    f: |&Element|NewElement
): vector<NewElement> {
    let result = vector<NewElement>[];
    for_each_ref(self, |elem| push_back(&mut result, f(elem)));
    result
}
```

</details>

<a id="0x1_vector_zip_map_ref"></a>

## Function `zip_map_ref`

Map the function over the references of the element pairs of two vectors, producing a new vector from the return
values without modifying the original vectors.

```move
public fun zip_map_ref<Element1, Element2, NewElement>(self: &vector<Element1>, v2: &vector<Element2>, f: |(&Element1, &Element2)|NewElement): vector<NewElement>
```

<details>
<summary>Implementation</summary>

```move
public inline fun zip_map_ref<Element1, Element2, NewElement>(
    self: &vector<Element1>,
    v2: &vector<Element2>,
    f: |&Element1, &Element2|NewElement
): vector<NewElement> {
    // We can't use the constant EVECTORS_LENGTH_MISMATCH here as all calling code would then need to define it
    // due to how inline functions work.
    assert!(length(self) == length(v2), 0x20002);

    let result = vector<NewElement>[];
    zip_ref(self, v2, |e1, e2| push_back(&mut result, f(e1, e2)));
    result
}
```

</details>

<a id="0x1_vector_map"></a>

## Function `map`

Map the function over the elements of the vector, producing a new vector.

```move
public fun map<Element, NewElement>(self: vector<Element>, f: |Element|NewElement): vector<NewElement>
```

<details>
<summary>Implementation</summary>

```move
public inline fun map<Element, NewElement>(
    self: vector<Element>,
    f: |Element|NewElement
): vector<NewElement> {
    let result = vector<NewElement>[];
    for_each(self, |elem| push_back(&mut result, f(elem)));
    result
}
```

</details>

<a id="0x1_vector_zip_map"></a>

## Function `zip_map`

Map the function over the element pairs of the two vectors, producing a new vector.

```move
public fun zip_map<Element1, Element2, NewElement>(self: vector<Element1>, v2: vector<Element2>, f: |(Element1, Element2)|NewElement): vector<NewElement>
```

<details>
<summary>Implementation</summary>

```move
public inline fun zip_map<Element1, Element2, NewElement>(
    self: vector<Element1>,
    v2: vector<Element2>,
    f: |Element1, Element2|NewElement
): vector<NewElement> {
    // We can't use the constant EVECTORS_LENGTH_MISMATCH here as all calling code would then need to define it
    // due to how inline functions work.
    assert!(length(&self) == length(&v2), 0x20002);

    let result = vector<NewElement>[];
    zip(self, v2, |e1, e2| push_back(&mut result, f(e1, e2)));
    result
}
```

</details>

<a id="0x1_vector_filter"></a>

## Function `filter`

Filter the vector using the boolean function, removing all elements for which <code>p(e)</code> is not true.

```move
public fun filter<Element: drop>(self: vector<Element>, p: |&Element|bool): vector<Element>
```

<details>
<summary>Implementation</summary>

```move
public inline fun filter<Element:drop>(
    self: vector<Element>,
    p: |&Element|bool
): vector<Element> {
    let result = vector<Element>[];
    for_each(self, |elem| {
        if (p(&elem)) push_back(&mut result, elem);
    });
    result
}
```

</details>

<a id="0x1_vector_partition"></a>

## Function `partition`

Partition, sorts all elements for which pred is true to the front.
Preserves the relative order of the elements for which pred is true,
BUT NOT for the elements for which pred is false.

```move
public fun partition<Element>(self: &mut vector<Element>, pred: |&Element|bool): u64
```

<details>
<summary>Implementation</summary>

```move
public inline fun partition<Element>(
    self: &mut vector<Element>,
    pred: |&Element|bool
): u64 {
    let i = 0;
    let len = length(self);
    while (i < len) {
        if (!pred(borrow(self, i))) break;
        i = i + 1;
    };
    let p = i;
    i = i + 1;
    while (i < len) {
        if (pred(borrow(self, i))) {
            swap(self, p, i);
            p = p + 1;
        };
        i = i + 1;
    };
    p
}
```

</details>

<a id="0x1_vector_rotate"></a>

## Function `rotate`

rotate(\&mut \[1, 2, 3, 4, 5], 2) -&gt; \[3, 4, 5, 1, 2] in place, returns the split point
ie. 3 in the example above

```move
public fun rotate<Element>(self: &mut vector<Element>, rot: u64): u64
```

<details>
<summary>Implementation</summary>

```move
public fun rotate<Element>(
    self: &mut vector<Element>,
    rot: u64
): u64 {
    let len = length(self);
    rotate_slice(self, 0, rot, len)
}
```

</details>

<a id="0x1_vector_rotate_slice"></a>

## Function `rotate_slice`

Same as above but on a sub-slice of an array \[left, right) with left &lt;= rot &lt;= right
returns the

```move
public fun rotate_slice<Element>(self: &mut vector<Element>, left: u64, rot: u64, right: u64): u64
```

<details>
<summary>Implementation</summary>

```move
public fun rotate_slice<Element>(
    self: &mut vector<Element>,
    left: u64,
    rot: u64,
    right: u64
): u64 {
    reverse_slice(self, left, rot);
    reverse_slice(self, rot, right);
    reverse_slice(self, left, right);
    left + (right - rot)
}
```

</details>

<a id="0x1_vector_stable_partition"></a>

## Function `stable_partition`

Partition the array based on a predicate p, this routine is stable and thus
preserves the relative order of the elements in the two partitions.

```move
public fun stable_partition<Element>(self: &mut vector<Element>, p: |&Element|bool): u64
```

<details>
<summary>Implementation</summary>

```move
public inline fun stable_partition<Element>(
    self: &mut vector<Element>,
    p: |&Element|bool
): u64 {
    let len = length(self);
    let t = empty();
    let f = empty();
    while (len > 0) {
        let e = pop_back(self);
        if (p(&e)) {
            push_back(&mut t, e);
        } else {
            push_back(&mut f, e);
        };
        len = len - 1;
    };
    let pos = length(&t);
    reverse_append(self, t);
    reverse_append(self, f);
    pos
}
```

</details>

<a id="0x1_vector_any"></a>

## Function `any`

Return true if any element in the vector satisfies the predicate.

```move
public fun any<Element>(self: &vector<Element>, p: |&Element|bool): bool
```

<details>
<summary>Implementation</summary>

```move
public inline fun any<Element>(
    self: &vector<Element>,
    p: |&Element|bool
): bool {
    let result = false;
    let i = 0;
    while (i < length(self)) {
        result = p(borrow(self, i));
        if (result) {
            break
        };
        i = i + 1
    };
    result
}
```

</details>

<a id="0x1_vector_all"></a>

## Function `all`

Return true if all elements in the vector satisfy the predicate.

```move
public fun all<Element>(self: &vector<Element>, p: |&Element|bool): bool
```

<details>
<summary>Implementation</summary>

```move
public inline fun all<Element>(
    self: &vector<Element>,
    p: |&Element|bool
): bool {
    let result = true;
    let i = 0;
    while (i < length(self)) {
        result = p(borrow(self, i));
        if (!result) {
            break
        };
        i = i + 1
    };
    result
}
```

</details>

<a id="0x1_vector_destroy"></a>

## Function `destroy`

Destroy a vector, just a wrapper around for_each_reverse with a descriptive name
when used in the context of destroying a vector.

```move
public fun destroy<Element>(self: vector<Element>, d: |Element|)
```

<details>
<summary>Implementation</summary>

```move
public inline fun destroy<Element>(
    self: vector<Element>,
    d: |Element|
) {
    for_each_reverse(self, |e| d(e))
}
```

</details>

<a id="0x1_vector_range"></a>

## Function `range`

```move
public fun range(start: u64, end: u64): vector<u64>
```

<details>
<summary>Implementation</summary>

```move
public fun range(start: u64, end: u64): vector<u64> {
    range_with_step(start, end, 1)
}
```

</details>

<a id="0x1_vector_range_with_step"></a>

## Function `range_with_step`

```move
public fun range_with_step(start: u64, end: u64, step: u64): vector<u64>
```

<details>
<summary>Implementation</summary>

```move
public fun range_with_step(start: u64, end: u64, step: u64): vector<u64> {
    assert!(step > 0, EINVALID_STEP);

    let vec = vector[];
    while (start < end) {
        push_back(&mut vec, start);
        start = start + step;
    };
    vec
}
```

</details>

<a id="0x1_vector_slice"></a>

## Function `slice`

```move
public fun slice<Element: copy>(self: &vector<Element>, start: u64, end: u64): vector<Element>
```

<details>
<summary>Implementation</summary>

```move
public fun slice<Element: copy>(
    self: &vector<Element>,
    start: u64,
    end: u64
): vector<Element> {
    assert!(start <= end && end <= length(self), EINVALID_SLICE_RANGE);

    let vec = vector[];
    while (start < end) {
        push_back(&mut vec, *borrow(self, start));
        start = start + 1;
    };
    vec
}
```

</details>

<a id="@Specification_1"></a>

## Specification

<a id="@Helper_Functions_2"></a>

### Helper Functions

Check if <code>self</code> is equal to the result of adding <code>e</code> at the end of <code>v2</code>

<a id="0x1_vector_eq_push_back"></a>

```move
fun eq_push_back<Element>(self: vector<Element>, v2: vector<Element>, e: Element): bool {
    len(self) == len(v2) + 1 &&
    self[len(self)-1] == e &&
    self[0..len(self)-1] == v2[0..len(v2)]
}
```

Check if <code>self</code> is equal to the result of concatenating <code>v1</code> and <code>v2</code>

<a id="0x1_vector_eq_append"></a>

```move
fun eq_append<Element>(self: vector<Element>, v1: vector<Element>, v2: vector<Element>): bool {
    len(self) == len(v1) + len(v2) &&
    self[0..len(v1)] == v1 &&
    self[len(v1)..len(self)] == v2
}
```

Check <code>self</code> is equal to the result of removing the first element of <code>v2</code>

<a id="0x1_vector_eq_pop_front"></a>

```move
fun eq_pop_front<Element>(self: vector<Element>, v2: vector<Element>): bool {
    len(self) + 1 == len(v2) &&
    self == v2[1..len(v2)]
}
```

Check that <code>v1</code> is equal to the result of removing the element at index <code>i</code> from <code>v2</code>.

<a id="0x1_vector_eq_remove_elem_at_index"></a>

```move
fun eq_remove_elem_at_index<Element>(i: u64, v1: vector<Element>, v2: vector<Element>): bool {
    len(v1) + 1 == len(v2) &&
    v1[0..i] == v2[0..i] &&
    v1[i..len(v1)] == v2[i + 1..len(v2)]
}
```

Check if <code>self</code> contains <code>e</code>.

<a id="0x1_vector_spec_contains"></a>

```move
fun spec_contains<Element>(self: vector<Element>, e: Element): bool {
    exists x in self: x == e
}
```

<a id="@Specification_1_singleton"></a>

### Function `singleton`

```move
public fun singleton<Element>(e: Element): vector<Element>
```

```move
aborts_if false;
ensures result == vec(e);
```

<a id="@Specification_1_reverse"></a>

### Function `reverse`

```move
public fun reverse<Element>(self: &mut vector<Element>)
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_reverse_slice"></a>

### Function `reverse_slice`

```move
public fun reverse_slice<Element>(self: &mut vector<Element>, left: u64, right: u64)
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_append"></a>

### Function `append`

```move
public fun append<Element>(self: &mut vector<Element>, other: vector<Element>)
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_reverse_append"></a>

### Function `reverse_append`

```move
public fun reverse_append<Element>(self: &mut vector<Element>, other: vector<Element>)
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_trim"></a>

### Function `trim`

```move
public fun trim<Element>(self: &mut vector<Element>, new_len: u64): vector<Element>
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_trim_reverse"></a>

### Function `trim_reverse`

```move
public fun trim_reverse<Element>(self: &mut vector<Element>, new_len: u64): vector<Element>
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_is_empty"></a>

### Function `is_empty`

```move
public fun is_empty<Element>(self: &vector<Element>): bool
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_contains"></a>

### Function `contains`

```move
public fun contains<Element>(self: &vector<Element>, e: &Element): bool
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_index_of"></a>

### Function `index_of`

```move
public fun index_of<Element>(self: &vector<Element>, e: &Element): (bool, u64)
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_insert"></a>

### Function `insert`

```move
public fun insert<Element>(self: &mut vector<Element>, i: u64, e: Element)
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_remove"></a>

### Function `remove`

```move
public fun remove<Element>(self: &mut vector<Element>, i: u64): Element
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_remove_value"></a>

### Function `remove_value`

```move
public fun remove_value<Element>(self: &mut vector<Element>, val: &Element): vector<Element>
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_swap_remove"></a>

### Function `swap_remove`

```move
public fun swap_remove<Element>(self: &mut vector<Element>, i: u64): Element
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_rotate"></a>

### Function `rotate`

```move
public fun rotate<Element>(self: &mut vector<Element>, rot: u64): u64
```

```move
pragma intrinsic = true;
```

<a id="@Specification_1_rotate_slice"></a>

### Function `rotate_slice`

```move
public fun rotate_slice<Element>(self: &mut vector<Element>, left: u64, rot: u64, right: u64): u64
```

```move
pragma intrinsic = true;
```

[move-book]: https://aptos.dev/move/book/SUMMARY
