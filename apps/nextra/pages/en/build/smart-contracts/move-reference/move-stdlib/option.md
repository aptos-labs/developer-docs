<a id="0x1_option"></a>

# Module `0x1::option`

This module defines the Option type and its methods to represent and handle an optional value.

- [Struct `Option`](#0x1_option_Option)
- [Constants](#@Constants_0)
- [Function `none`](#0x1_option_none)
- [Function `some`](#0x1_option_some)
- [Function `from_vec`](#0x1_option_from_vec)
- [Function `is_none`](#0x1_option_is_none)
- [Function `is_some`](#0x1_option_is_some)
- [Function `contains`](#0x1_option_contains)
- [Function `borrow`](#0x1_option_borrow)
- [Function `borrow_with_default`](#0x1_option_borrow_with_default)
- [Function `get_with_default`](#0x1_option_get_with_default)
- [Function `fill`](#0x1_option_fill)
- [Function `extract`](#0x1_option_extract)
- [Function `borrow_mut`](#0x1_option_borrow_mut)
- [Function `swap`](#0x1_option_swap)
- [Function `swap_or_fill`](#0x1_option_swap_or_fill)
- [Function `destroy_with_default`](#0x1_option_destroy_with_default)
- [Function `destroy_some`](#0x1_option_destroy_some)
- [Function `destroy_none`](#0x1_option_destroy_none)
- [Function `to_vec`](#0x1_option_to_vec)
- [Function `for_each`](#0x1_option_for_each)
- [Function `for_each_ref`](#0x1_option_for_each_ref)
- [Function `for_each_mut`](#0x1_option_for_each_mut)
- [Function `fold`](#0x1_option_fold)
- [Function `map`](#0x1_option_map)
- [Function `map_ref`](#0x1_option_map_ref)
- [Function `filter`](#0x1_option_filter)
- [Function `any`](#0x1_option_any)
- [Function `destroy`](#0x1_option_destroy)

```move
module 0x1::option {
    use 0x1::vector;
}
```

<a id="0x1_option_Option"></a>

## Struct `Option`

Abstraction of a value that may or may not be present. Implemented with a vector of size
zero or one because Move bytecode does not have ADTs.

```move
module 0x1::option {
    struct Option<Element> has copy, drop, store
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_option_EOPTION_IS_SET"></a>

The `Option` is in an invalid state for the operation attempted.
The `Option` is `Some` while it should be `None`.

```move
module 0x1::option {
    const EOPTION_IS_SET: u64 = 262144;
}
```

<a id="0x1_option_EOPTION_NOT_SET"></a>

The `Option` is in an invalid state for the operation attempted.
The `Option` is `None` while it should be `Some`.

```move
module 0x1::option {
    const EOPTION_NOT_SET: u64 = 262145;
}
```

<a id="0x1_option_EOPTION_VEC_TOO_LONG"></a>

Cannot construct an option from a vector with 2 or more elements.

```move
module 0x1::option {
    const EOPTION_VEC_TOO_LONG: u64 = 262146;
}
```

<a id="0x1_option_none"></a>

## Function `none`

Return an empty `Option`

```move
module 0x1::option {
    public fun none<Element>(): option::Option<Element>
}
```

<a id="0x1_option_some"></a>

## Function `some`

Return an `Option` containing `e`

```move
module 0x1::option {
    public fun some<Element>(e: Element): option::Option<Element>
}
```

<a id="0x1_option_from_vec"></a>

## Function `from_vec`

```move
module 0x1::option {
    public fun from_vec<Element>(vec: vector<Element>): option::Option<Element>
}
```

<a id="0x1_option_is_none"></a>

## Function `is_none`

Return true if `t` does not hold a value

```move
module 0x1::option {
    public fun is_none<Element>(t: &option::Option<Element>): bool
}
```

<a id="0x1_option_is_some"></a>

## Function `is_some`

Return true if `t` holds a value

```move
module 0x1::option {
    public fun is_some<Element>(t: &option::Option<Element>): bool
}
```

<a id="0x1_option_contains"></a>

## Function `contains`

Return true if the value in `t` is equal to `e_ref`
Always returns `false` if `t` does not hold a value

```move
module 0x1::option {
    public fun contains<Element>(t: &option::Option<Element>, e_ref: &Element): bool
}
```

<a id="0x1_option_borrow"></a>

## Function `borrow`

Return an immutable reference to the value inside `t`
Aborts if `t` does not hold a value

```move
module 0x1::option {
    public fun borrow<Element>(t: &option::Option<Element>): &Element
}
```

<a id="0x1_option_borrow_with_default"></a>

## Function `borrow_with_default`

Return a reference to the value inside `t` if it holds one
Return `default_ref` if `t` does not hold a value

```move
module 0x1::option {
    public fun borrow_with_default<Element>(t: &option::Option<Element>, default_ref: &Element): &Element
}
```

<a id="0x1_option_get_with_default"></a>

## Function `get_with_default`

Return the value inside `t` if it holds one
Return `default` if `t` does not hold a value

```move
module 0x1::option {
    public fun get_with_default<Element: copy, drop>(t: &option::Option<Element>, default: Element): Element
}
```

<a id="0x1_option_fill"></a>

## Function `fill`

Convert the none option `t` to a some option by adding `e`.
Aborts if `t` already holds a value

```move
module 0x1::option {
    public fun fill<Element>(t: &mut option::Option<Element>, e: Element)
}
```

<a id="0x1_option_extract"></a>

## Function `extract`

Convert a `some` option to a `none` by removing and returning the value stored inside `t`
Aborts if `t` does not hold a value

```move
module 0x1::option {
    public fun extract<Element>(t: &mut option::Option<Element>): Element
}
```

<a id="0x1_option_borrow_mut"></a>

## Function `borrow_mut`

Return a mutable reference to the value inside `t`
Aborts if `t` does not hold a value

```move
module 0x1::option {
    public fun borrow_mut<Element>(t: &mut option::Option<Element>): &mut Element
}
```

<a id="0x1_option_swap"></a>

## Function `swap`

Swap the old value inside `t` with `e` and return the old value
Aborts if `t` does not hold a value

```move
module 0x1::option {
    public fun swap<Element>(t: &mut option::Option<Element>, e: Element): Element
}
```

<a id="0x1_option_swap_or_fill"></a>

## Function `swap_or_fill`

Swap the old value inside `t` with `e` and return the old value;
or if there is no old value, fill it with `e`.
Different from swap(), swap_or_fill() allows for `t` not holding a value.

```move
module 0x1::option {
    public fun swap_or_fill<Element>(t: &mut option::Option<Element>, e: Element): option::Option<Element>
}
```

<a id="0x1_option_destroy_with_default"></a>

## Function `destroy_with_default`

Destroys `t.` If `t` holds a value, return it. Returns `default` otherwise

```move
module 0x1::option {
    public fun destroy_with_default<Element: drop>(t: option::Option<Element>, default: Element): Element
}
```

<a id="0x1_option_destroy_some"></a>

## Function `destroy_some`

Unpack `t` and return its contents
Aborts if `t` does not hold a value

```move
module 0x1::option {
    public fun destroy_some<Element>(t: option::Option<Element>): Element
}
```

<a id="0x1_option_destroy_none"></a>

## Function `destroy_none`

Unpack `t`
Aborts if `t` holds a value

```move
module 0x1::option {
    public fun destroy_none<Element>(t: option::Option<Element>)
}
```

<a id="0x1_option_to_vec"></a>

## Function `to_vec`

Convert `t` into a vector of length 1 if it is `Some`,
and an empty vector otherwise

```move
module 0x1::option {
    public fun to_vec<Element>(t: option::Option<Element>): vector<Element>
}
```

<a id="0x1_option_for_each"></a>

## Function `for_each`

Apply the function to the optional element, consuming it. Does nothing if no value present.

```move
module 0x1::option {
    public fun for_each<Element>(o: option::Option<Element>, f: |Element|)
}
```

<a id="0x1_option_for_each_ref"></a>

## Function `for_each_ref`

Apply the function to the optional element reference. Does nothing if no value present.

```move
module 0x1::option {
    public fun for_each_ref<Element>(o: &option::Option<Element>, f: |&Element|)
}
```

<a id="0x1_option_for_each_mut"></a>

## Function `for_each_mut`

Apply the function to the optional element reference. Does nothing if no value present.

```move
module 0x1::option {
    public fun for_each_mut<Element>(o: &mut option::Option<Element>, f: |&mut Element|)
}
```

<a id="0x1_option_fold"></a>

## Function `fold`

Folds the function over the optional element.

```move
module 0x1::option {
    public fun fold<Accumulator, Element>(o: option::Option<Element>, init: Accumulator, f: |(Accumulator, Element)|Accumulator): Accumulator
}
```

<a id="0x1_option_map"></a>

## Function `map`

Maps the content of an option.

```move
module 0x1::option {
    public fun map<Element, OtherElement>(o: option::Option<Element>, f: |Element|OtherElement): option::Option<OtherElement>
}
```

<a id="0x1_option_map_ref"></a>

## Function `map_ref`

Maps the content of an option without destroying the original option.

```move
module 0x1::option {
    public fun map_ref<Element, OtherElement>(o: &option::Option<Element>, f: |&Element|OtherElement): option::Option<OtherElement>
}
```

<a id="0x1_option_filter"></a>

## Function `filter`

Filters the content of an option

```move
module 0x1::option {
    public fun filter<Element: drop>(o: option::Option<Element>, f: |&Element|bool): option::Option<Element>
}
```

<a id="0x1_option_any"></a>

## Function `any`

Returns true if the option contains an element which satisfies predicate.

```move
module 0x1::option {
    public fun any<Element>(o: &option::Option<Element>, p: |&Element|bool): bool
}
```

<a id="0x1_option_destroy"></a>

## Function `destroy`

Utility function to destroy an option that is not droppable.

```move
module 0x1::option {
    public fun destroy<Element>(o: option::Option<Element>, d: |Element|)
}
```
