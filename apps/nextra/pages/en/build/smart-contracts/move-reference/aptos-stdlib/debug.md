<a id="0x1_debug"></a>

# Module `0x1::debug`

Module providing debug functionality.

- [Constants](#@Constants_0)
- [Function `print`](#0x1_debug_print)
- [Function `print_stack_trace`](#0x1_debug_print_stack_trace)

```move
module 0x1::debug {
    use 0x1::string;
    use 0x1::string_utils;
}
```

<a id="@Constants_0"></a>

## Constants

<a id="0x1_debug_MSG_1"></a>

```move
module 0x1::debug {
    const MSG_1: vector<u8> = [97, 98, 99, 100, 101, 102];
}
```

<a id="0x1_debug_MSG_2"></a>

```move
module 0x1::debug {
    const MSG_2: vector<u8> = [49, 50, 51, 52, 53, 54];
}
```

<a id="0x1_debug_print"></a>

## Function `print`

```move
module 0x1::debug {
    public fun print<T>(x: &T)
}
```

<a id="0x1_debug_print_stack_trace"></a>

## Function `print_stack_trace`

```move
module 0x1::debug {
    public fun print_stack_trace()
}
```
