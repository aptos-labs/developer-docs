<a id="0x1_resource_account"></a>

# Module `0x1::resource_account`

A resource account is used to manage resources independent of an account managed by a user.
This contains several utilities to make using resource accounts more effective.

<a id="@Resource_Accounts_to_manage_liquidity_pools_0"></a>

### Resource Accounts to manage liquidity pools

A dev wishing to use resource accounts for a liquidity pool, would likely do the following:

1. Create a new account using `resource_account::create_resource_account`. This creates the
   account, stores the `signer_cap` within a `resource_account::Container`, and rotates the key to
   the current account&apos;s authentication key or a provided authentication key.
2. Define the liquidity pool module&apos;s address to be the same as the resource account.
3. Construct a package&#45;publishing transaction for the resource account using the
   authentication key used in step 1.
4. In the liquidity pool module&apos;s `init_module` function, call `retrieve_resource_account_cap`
   which will retrieve the `signer_cap` and rotate the resource account&apos;s authentication key to
   `0x0`, effectively locking it off.
5. When adding a new coin, the liquidity pool will load the capability and hence the `signer` to
   register and store new `LiquidityCoin` resources.

Code snippets to help:

```
fun init_module(resource_account: &amp;signer) &#123;
let dev_address &#61; @DEV_ADDR;
let signer_cap &#61; retrieve_resource_account_cap(resource_account, dev_address);
let lp &#61; LiquidityPoolInfo &#123; signer_cap: signer_cap, ... &#125;;
move_to(resource_account, lp);
&#125;
```

Later on during a coin registration:

```
public fun add_coin&lt;X, Y&gt;(lp: &amp;LP, x: Coin&lt;x&gt;, y: Coin&lt;y&gt;) &#123;
if(!exists&lt;LiquidityCoin&lt;X, Y&gt;(LP::Address(lp), LiquidityCoin&lt;X, Y&gt;)) &#123;
let mint, burn &#61; Coin::initialize&lt;LiquidityCoin&lt;X, Y&gt;&gt;(...);
move_to(&amp;create_signer_with_capability(&amp;lp.cap), LiquidityCoin&lt;X, Y&gt;&#123; mint, burn &#125;);
&#125;
...
&#125;
```

<a id="@Resource_accounts_to_manage_an_account_for_module_publishing_(i.e.,_contract_account)_1"></a>

### Resource accounts to manage an account for module publishing (i.e., contract account)

A dev wishes to have an account dedicated to managing a contract. The contract itself does not
require signer post initialization. The dev could do the following:

1. Create a new account using `resource_account::create_resource_account_and_publish_package`.
   This creates the account and publishes the package for that account.
2. At a later point in time, the account creator can move the signer capability to the module.

```
struct MyModuleResource has key &#123;
...
resource_signer_cap: Option&lt;SignerCapability&gt;,
&#125;

public fun provide_signer_capability(resource_signer_cap: SignerCapability) &#123;
let account_addr &#61; account::get_signer_capability_address(resource_signer_cap);
let resource_addr &#61; type_info::account_address(&amp;type_info::type_of&lt;MyModuleResource&gt;());
assert!(account_addr &#61;&#61; resource_addr, EADDRESS_MISMATCH);
let module &#61; borrow_global_mut&lt;MyModuleResource&gt;(account_addr);
module.resource_signer_cap &#61; option::some(resource_signer_cap);
&#125;
```

    -  [Resource Accounts to manage liquidity pools](#@Resource_Accounts_to_manage_liquidity_pools_0)
    -  [Resource accounts to manage an account for module publishing (i.e., contract account)](#@Resource_accounts_to_manage_an_account_for_module_publishing_(i.e.,_contract_account)_1)

- [Resource `Container`](#0x1_resource_account_Container)
- [Constants](#@Constants_2)
- [Function `create_resource_account`](#0x1_resource_account_create_resource_account)
- [Function `create_resource_account_and_fund`](#0x1_resource_account_create_resource_account_and_fund)
- [Function `create_resource_account_and_publish_package`](#0x1_resource_account_create_resource_account_and_publish_package)
- [Function `retrieve_resource_account_cap`](#0x1_resource_account_retrieve_resource_account_cap)

```move
module 0x1::resource_account {
    use 0x1::account;
    use 0x1::aptos_coin;
    use 0x1::code;
    use 0x1::coin;
    use 0x1::error;
    use 0x1::signer;
    use 0x1::simple_map;
    use 0x1::vector;
}
```

<a id="0x1_resource_account_Container"></a>

## Resource `Container`

```move
module 0x1::resource_account {
    struct Container has key
}
```

<a id="@Constants_2"></a>

## Constants

<a id="0x1_resource_account_ZERO_AUTH_KEY"></a>

```move
module 0x1::resource_account {
    const ZERO_AUTH_KEY: vector<u8> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
```

<a id="0x1_resource_account_ECONTAINER_NOT_PUBLISHED"></a>

Container resource not found in account

```move
module 0x1::resource_account {
    const ECONTAINER_NOT_PUBLISHED: u64 = 1;
}
```

<a id="0x1_resource_account_EUNAUTHORIZED_NOT_OWNER"></a>

The resource account was not created by the specified source account

```move
module 0x1::resource_account {
    const EUNAUTHORIZED_NOT_OWNER: u64 = 2;
}
```

<a id="0x1_resource_account_create_resource_account"></a>

## Function `create_resource_account`

Creates a new resource account and rotates the authentication key to either
the optional auth key if it is non&#45;empty (though auth keys are 32&#45;bytes)
or the source accounts current auth key.

```move
module 0x1::resource_account {
    public entry fun create_resource_account(origin: &signer, seed: vector<u8>, optional_auth_key: vector<u8>)
}
```

<a id="0x1_resource_account_create_resource_account_and_fund"></a>

## Function `create_resource_account_and_fund`

Creates a new resource account, transfer the amount of coins from the origin to the resource
account, and rotates the authentication key to either the optional auth key if it is
non&#45;empty (though auth keys are 32&#45;bytes) or the source accounts current auth key. Note,
this function adds additional resource ownership to the resource account and should only be
used for resource accounts that need access to `Coin<AptosCoin>`.

```move
module 0x1::resource_account {
    public entry fun create_resource_account_and_fund(origin: &signer, seed: vector<u8>, optional_auth_key: vector<u8>, fund_amount: u64)
}
```

<a id="0x1_resource_account_create_resource_account_and_publish_package"></a>

## Function `create_resource_account_and_publish_package`

Creates a new resource account, publishes the package under this account transaction under
this account and leaves the signer cap readily available for pickup.

```move
module 0x1::resource_account {
    public entry fun create_resource_account_and_publish_package(origin: &signer, seed: vector<u8>, metadata_serialized: vector<u8>, code: vector<vector<u8>>)
}
```

<a id="0x1_resource_account_retrieve_resource_account_cap"></a>

## Function `retrieve_resource_account_cap`

When called by the resource account, it will retrieve the capability associated with that
account and rotate the account&apos;s auth key to 0x0 making the account inaccessible without
the SignerCapability.

```move
module 0x1::resource_account {
    public fun retrieve_resource_account_cap(resource: &signer, source_addr: address): account::SignerCapability
}
```
