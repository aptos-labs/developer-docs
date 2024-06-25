<a id="0x1_create_signer"></a>

# Module `0x1::create_signer`

Provides a common place for exporting `create_signer` across the Aptos Framework.

To use create_signer, add the module below, such that:
`friend aptos_framework::friend_wants_create_signer`
where `friend_wants_create_signer` is the module that needs `create_signer`.

Note, that this is only available within the Aptos Framework.

This exists to make auditing straight forward and to limit the need to depend
on account to have access to this.

- [Function `create_signer`](#0x1_create_signer_create_signer)

```move
module 0x1::create_signer {
}
```

<a id="0x1_create_signer_create_signer"></a>

## Function `create_signer`

```move
module 0x1::create_signer {
    public(friend) fun create_signer(addr: address): signer
}
```
