---
title: "Move Tests"
---

# How to create effective Move unit tests

Move unit tests, allow developers to build testing outside of an actual
Aptos network to ensure functionality is correct. Creating Move Unit tests
is an essential part of any good Move contract.

## Basic unit tests

Below shows an example of how to write a unit test for a function. If the
function is private, inline tests (within the same module), allow for
testing private test cases. Note that it is important to keep any testing only
code with the `#[test_only]` annotation to prevent it from being deployed when
publishing the contract.

```move
module my_addr::test_example {

  /// Adds two u8 values with overflow (no error when it excceeds 255) allowed
  fun add_numbers_with_overflow(a: u8, b: u8): u64 {
    let total = (a as u16) + (b as u16);

    ((total % 256) as u8)
  }

  /// Test case doesn't match expected value
  const E_NOT_EXPECTED: u64 = 1;

  #[test]
  /// Tests cases that don't overflow
  fun test_no_overflow() {
    test_numbers(0, 0, 0);
    test_numbers(0, 1, 1);
    test_numbers(255, 0, 255);
    test_numbers(0, 255, 255);
    test_numbers(1, 254, 255);
  }

  #[test]
  /// Tests cases that do overflow
  fun test_overflow() {
    test_numbers(255, 1, 0);
    test_numbers(1, 255, 0);
    test_numbers(255, 255, 254);
  }

  #[test_only]
  /// Helper function that asserts the expected value
  fun test_numbers(a: u8, b: u8, expected: u8) {
    let result = add_numbers_with_overflow(a, b);
    assert!(result == expected, E_NOT_EXPECTED)
  }
}
```

<!-- TODO: Add information around testing with accounts, initializing framework state-->

# More details

- See [unit testing](../../book/unit-testing.md)
