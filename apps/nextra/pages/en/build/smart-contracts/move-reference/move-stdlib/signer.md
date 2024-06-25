<a id="0x1_signer"></a>

# Module `0x1::signer`

- [Function `borrow_address`](#0x1_signer_borrow_address)
- [Function `address_of`](#0x1_signer_address_of)

```move
module 0x1::signer {
}
```

<a id="0x1_signer_borrow_address"></a>

## Function `borrow_address`

Borrows the address of the signer
Conceptually, you can think of the `signer` as being a struct wrapper around an
address

```
struct signer has drop &#123; addr: address &#125;
```

`borrow_address` borrows this inner field

```move
module 0x1::signer {
    public fun borrow_address(s: &signer): &address
}
```

<a id="0x1_signer_address_of"></a>

## Function `address_of`

```move
module 0x1::signer {
    public fun address_of(s: &signer): address
}
```
