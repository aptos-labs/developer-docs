<a id="0x1_error"></a>

# Module `0x1::error`

This module defines a set of canonical error codes which are optional to use by applications for the
`abort` and `assert!` features.

Canonical error codes use the 3 lowest bytes of the u64 abort code range (the upper 5 bytes are free for other use).
Of those, the highest byte represents the \*error category\* and the lower two bytes the \*error reason\*.
Given an error category `0x1` and a reason `0x3`, a canonical abort code looks as `0x10003`.

A module can use a canonical code with a constant declaration of the following form:

```
///  An invalid ASCII character was encountered when creating a string.
const EINVALID_CHARACTER: u64 &#61; 0x010003;
```

This code is both valid in the worlds with and without canonical errors. It can be used as a plain module local
error reason understand by the existing error map tooling, or as a canonical code.

The actual canonical categories have been adopted from Google&apos;s canonical error codes, which in turn are derived
from Unix error codes [see here](https://cloud.google.com/apis/design/errors#handling_errors). Each code has an
associated HTTP error code which can be used in REST apis. The mapping from error code to http code is not 1:1;
error codes here are a bit richer than HTTP codes.

- [Constants](#@Constants_0)
- [Function `canonical`](#0x1_error_canonical)
- [Function `invalid_argument`](#0x1_error_invalid_argument)
- [Function `out_of_range`](#0x1_error_out_of_range)
- [Function `invalid_state`](#0x1_error_invalid_state)
- [Function `unauthenticated`](#0x1_error_unauthenticated)
- [Function `permission_denied`](#0x1_error_permission_denied)
- [Function `not_found`](#0x1_error_not_found)
- [Function `aborted`](#0x1_error_aborted)
- [Function `already_exists`](#0x1_error_already_exists)
- [Function `resource_exhausted`](#0x1_error_resource_exhausted)
- [Function `internal`](#0x1_error_internal)
- [Function `not_implemented`](#0x1_error_not_implemented)
- [Function `unavailable`](#0x1_error_unavailable)

```move
module 0x1::error {
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_error_ABORTED"></a>

Concurrency conflict, such as read&#45;modify&#45;write conflict (http: 409)

```move
module 0x1::error {
    const ABORTED: u64 = 7;
}
```

<a id="0x1_error_ALREADY_EXISTS"></a>

The resource that a client tried to create already exists (http: 409)

```move
module 0x1::error {
    const ALREADY_EXISTS: u64 = 8;
}
```

<a id="0x1_error_CANCELLED"></a>

Request cancelled by the client (http: 499)

```move
module 0x1::error {
    const CANCELLED: u64 = 10;
}
```

<a id="0x1_error_INTERNAL"></a>

Internal error (http: 500)

```move
module 0x1::error {
    const INTERNAL: u64 = 11;
}
```

<a id="0x1_error_INVALID_ARGUMENT"></a>

Caller specified an invalid argument (http: 400)

```move
module 0x1::error {
    const INVALID_ARGUMENT: u64 = 1;
}
```

<a id="0x1_error_INVALID_STATE"></a>

The system is not in a state where the operation can be performed (http: 400)

```move
module 0x1::error {
    const INVALID_STATE: u64 = 3;
}
```

<a id="0x1_error_NOT_FOUND"></a>

A specified resource is not found (http: 404)

```move
module 0x1::error {
    const NOT_FOUND: u64 = 6;
}
```

<a id="0x1_error_NOT_IMPLEMENTED"></a>

Feature not implemented (http: 501)

```move
module 0x1::error {
    const NOT_IMPLEMENTED: u64 = 12;
}
```

<a id="0x1_error_OUT_OF_RANGE"></a>

An input or result of a computation is out of range (http: 400)

```move
module 0x1::error {
    const OUT_OF_RANGE: u64 = 2;
}
```

<a id="0x1_error_PERMISSION_DENIED"></a>

client does not have sufficient permission (http: 403)

```move
module 0x1::error {
    const PERMISSION_DENIED: u64 = 5;
}
```

<a id="0x1_error_RESOURCE_EXHAUSTED"></a>

Out of gas or other forms of quota (http: 429)

```move
module 0x1::error {
    const RESOURCE_EXHAUSTED: u64 = 9;
}
```

<a id="0x1_error_UNAUTHENTICATED"></a>

Request not authenticated due to missing, invalid, or expired auth token (http: 401)

```move
module 0x1::error {
    const UNAUTHENTICATED: u64 = 4;
}
```

<a id="0x1_error_UNAVAILABLE"></a>

The service is currently unavailable. Indicates that a retry could solve the issue (http: 503)

```move
module 0x1::error {
    const UNAVAILABLE: u64 = 13;
}
```

<a id="0x1_error_canonical"></a>

## Function `canonical`

Construct a canonical error code from a category and a reason.

```move
module 0x1::error {
    public fun canonical(category: u64, reason: u64): u64
}
```

<a id="0x1_error_invalid_argument"></a>

## Function `invalid_argument`

Functions to construct a canonical error code of the given category.

```move
module 0x1::error {
    public fun invalid_argument(r: u64): u64
}
```

<a id="0x1_error_out_of_range"></a>

## Function `out_of_range`

```move
module 0x1::error {
    public fun out_of_range(r: u64): u64
}
```

<a id="0x1_error_invalid_state"></a>

## Function `invalid_state`

```move
module 0x1::error {
    public fun invalid_state(r: u64): u64
}
```

<a id="0x1_error_unauthenticated"></a>

## Function `unauthenticated`

```move
module 0x1::error {
    public fun unauthenticated(r: u64): u64
}
```

<a id="0x1_error_permission_denied"></a>

## Function `permission_denied`

```move
module 0x1::error {
    public fun permission_denied(r: u64): u64
}
```

<a id="0x1_error_not_found"></a>

## Function `not_found`

```move
module 0x1::error {
    public fun not_found(r: u64): u64
}
```

<a id="0x1_error_aborted"></a>

## Function `aborted`

```move
module 0x1::error {
    public fun aborted(r: u64): u64
}
```

<a id="0x1_error_already_exists"></a>

## Function `already_exists`

```move
module 0x1::error {
    public fun already_exists(r: u64): u64
}
```

<a id="0x1_error_resource_exhausted"></a>

## Function `resource_exhausted`

```move
module 0x1::error {
    public fun resource_exhausted(r: u64): u64
}
```

<a id="0x1_error_internal"></a>

## Function `internal`

```move
module 0x1::error {
    public fun internal(r: u64): u64
}
```

<a id="0x1_error_not_implemented"></a>

## Function `not_implemented`

```move
module 0x1::error {
    public fun not_implemented(r: u64): u64
}
```

<a id="0x1_error_unavailable"></a>

## Function `unavailable`

```move
module 0x1::error {
    public fun unavailable(r: u64): u64
}
```
