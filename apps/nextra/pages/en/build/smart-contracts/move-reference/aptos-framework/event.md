<a id="0x1_event"></a>

# Module `0x1::event`

The Event module defines an `EventHandleGenerator` that is used to create
`EventHandle`s with unique GUIDs. It contains a counter for the number
of `EventHandle`s it generates. An `EventHandle` is used to count the number of
events emitted to a handle and emit events to the event store.

- [Struct `EventHandle`](#0x1_event_EventHandle)
- [Function `emit`](#0x1_event_emit)
- [Function `new_event_handle`](#0x1_event_new_event_handle)
- [Function `emit_event`](#0x1_event_emit_event)
- [Function `guid`](#0x1_event_guid)
- [Function `counter`](#0x1_event_counter)
- [Function `destroy_handle`](#0x1_event_destroy_handle)

```move
module 0x1::event {
    use 0x1::bcs;
    use 0x1::guid;
}
```

<a id="0x1_event_EventHandle"></a>

## Struct `EventHandle`

A handle for an event such that:

1. Other modules can emit events to this handle.
2. Storage can use this handle to prove the total number of events that happened in the past.

```move
module 0x1::event {
    #[deprecated]
    struct EventHandle<T: drop, store> has store
}
```

<a id="0x1_event_emit"></a>

## Function `emit`

Emit a module event with payload `msg`.

```move
module 0x1::event {
    public fun emit<T: drop, store>(msg: T)
}
```

<a id="0x1_event_new_event_handle"></a>

## Function `new_event_handle`

Use EventHandleGenerator to generate a unique event handle for `sig`

```move
module 0x1::event {
    #[deprecated]
    public(friend) fun new_event_handle<T: drop, store>(guid: guid::GUID): event::EventHandle<T>
}
```

<a id="0x1_event_emit_event"></a>

## Function `emit_event`

Emit an event with payload `msg` by using `handle_ref`&apos;s key and counter.

```move
module 0x1::event {
    #[deprecated]
    public fun emit_event<T: drop, store>(handle_ref: &mut event::EventHandle<T>, msg: T)
}
```

<a id="0x1_event_guid"></a>

## Function `guid`

Return the GUID associated with this EventHandle

```move
module 0x1::event {
    #[deprecated]
    public fun guid<T: drop, store>(handle_ref: &event::EventHandle<T>): &guid::GUID
}
```

<a id="0x1_event_counter"></a>

## Function `counter`

Return the current counter associated with this EventHandle

```move
module 0x1::event {
    #[deprecated]
    public fun counter<T: drop, store>(handle_ref: &event::EventHandle<T>): u64
}
```

<a id="0x1_event_destroy_handle"></a>

## Function `destroy_handle`

Destroy a unique handle.

```move
module 0x1::event {
    #[deprecated]
    public fun destroy_handle<T: drop, store>(handle: event::EventHandle<T>)
}
```
