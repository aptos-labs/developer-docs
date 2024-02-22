---
title: "Security"
---

## Introduction

The Move language is designed with security and inherently offers several features including a type system and a linear logic. Despite this, its novelty and the intricacies of some business logic mean that developers might not always be familiar with Move's secure coding patterns, potentially leading to bugs.

This guide addresses this gap by detailing common anti-patterns and their secure alternatives. It provides practical examples to illustrate how security issues can arise and recommends best practices for secure coding. This guide aims to sharpen developers' understanding of Move's security mechanisms and ensure the robust development of smart contracts.

## Access Control

---

### Object Access Control

Accepting a `&signer` is not always sufficient for access control purposes. Be sure to assert that the signer is the expected account, especially when performing sensitive operations.

Users without proper authorization can execute privileged actions.

#### Example Insecure Code

This code snippet allows any user invoking the `delete` function to remove an `Object`, without verifying that the caller has the necessary permissions.

```move
struct Object has key{
	data: vector<u8>
}

public fun delete(user: &signer, obj: Object) {
	let Object { data } = obj;
}
```

#### Example Secure Code

A better alternative is to use the global storage provided by Move, by directly borrowing data off of `signer::address_of(signer)`. This approach ensures robust access control, as it exclusively accesses data contained within the address of the signer of the transaction. This method minimizes the risk of access control errors, ensuring that only the data owned by the `signer` can be manipulated.

```move
struct Object has key{
	data: vector<u8>
}

public fun delete(user: &signer) {
	let Object { data } = move_from<Object>(signer::address_of(user));
}
```

### Function visibility

Adhere to the principle of least privilege:

- Always start with private functions, change their visibility as it is needed by the business logic.
- Utilize `entry` for functions intended for use solely from the Aptos CLI or SDK.
- Utilize `friend` for functions that can only be accessible by specific modules.
- Utilize the `#[view]` decorator with functions that read data from storage without altering state.

Function visibility determines who can call a function. It's a way to enforce access control and is critical for smart contract security:

- private functions are only callable within the module they are defined in. They're not accessible from other modules or from the CLI/SDK, which prevents unintended interactions with contract internals.

```move
fun sample_function() { ... }
```

- `public(friend)` functions expand on this by allowing specified _friends_ modules to call the function, enabling controlled interaction between different contracts while still restricting general access.

```move
friend package::module;

public(friend) fun sample_function() { ... }
```

- `public` functions are callable by any published module or script.

```move
public fun sample_function() { ... }
```

- `#[view]` decorated functions cannot alter storage; they only read data, providing a safe way to access information without risking state modification.

```move
#[view]
public fun read_only() { ... }
```

- The `entry` modifier in Move is used to indicate entry points for transactions. Functions with the `entry` modifier serve as the starting point of execution when a transaction is submitted to the blockchain.

```move
entry fun f(){}
```

To summarize:

|                | Module itself | Other Modules                     | Aptos CLI/SDK |
| -------------- | ------------- | --------------------------------- | ------------- |
| private        | ✅            | ⛔                                | ⛔            |
| public(friend) | ✅            | ✅ if friend<br></br>⛔ otherwise | ⛔            |
| public         | ✅            | ✅                                | ⛔            |
| entry          | ✅            | ⛔                                | ✅            |

This layered visibility ensures that only authorized entities can execute certain functions, greatly reducing the risk of bugs or attacks that compromise contract integrity.

Note that it’s possible to combine `entry` with `public` or `public(friend)`

```move
public(friend) entry sample_function() { ... }
```

In this case `sample_function` can be called by both the Aptos CLI/SDK by any module declared as a friend.

#### Impact

Adhering to this principle ensures that functions are not over-exposed, restricting the scope of function access to only what is necessary for the business logic.

## Types and Data Structures

---

### Generics type check

Generics can be used to define functions and structs over different input data types. When using them, ensure that the generic types are valid and what’s expected. [Read more](https://aptos.dev/move/book/generics/) about generics.

Unchecked generics can lead to unauthorized actions or transaction aborts, potentially compromising the integrity of the protocol.

#### Example Insecure Code

The code below outlines a simplified version of a flash loan.

In the `flash_loan<T>` function, a user can borrow a given amount of coins type **`T`** along with a `Receipt` that records the borrowed amount plus a fee that should be returned to the protocol before the end of the transaction.

The `repay_flash_loan<T>` function accepts a `Receipt` and a `Coin<T>` as parameters. The function extracts the repayment amount from the `Receipt` and asserts that the value of the returned `Coin<T>` is greater than or equal to the amount specified in the `Receipt`, however there’s no check to ensure that the `Coin<T>` returned is the same as the `Coin<T>`that was initially loaned out, giving the ability to repay the loan with a coin of lesser value.

```move
struct Coin<T> {
    amount: u64
}

struct Receipt {
    amount: u64
}

public fun flash_loan<T>(user: &signer, amount: u64): (Coin<T>, Receipt) {
    let coin, fee = withdraw(user, amount);
    ( coin, Receipt {amount: amount + fee} )
}

public fun repay_flash_loan<T>(rec: Receipt, coins: Coin<T>) {
    let Receipt{ amount } = rec;
    assert!(coin::value<T>(&coin) >= rec.amount, 0);
    deposit(coin);
}
```

#### Example Secure Code

The Aptos Framework sample below creates a key-value table consisting of two generic types `K` and `V` . Its related `add` functions accepts as parameters a `Table<K, V>` object, a `key`, and a `value` of types `K` and `V` . The `phantom` syntax ensures that the key and value types cannot be different than those in the table, preventing type mismatches. [Read more](https://aptos.dev/move/book/generics/#phantom-type-parameters) about `phantom` type parameters.

```move
struct Table<phantom K: copy + drop, phantom V> has store {
    handle: address,
}

public fun add<K: copy + drop, V>(table: &mut Table<K, V>, key: K, val: V) {
    add_box<K, V, Box<V>>(table, key, Box { val })
}
```

Given the by-design type checking provided by the Move language, we can refine the code of our flash loan protocol. The code below ensures that the coins passed to `repay_flash_loan` match the originally-loaned coins.

```move
struct Coin<T> {
    amount: u64
}
struct Receipt<phantom T> {
    amount: u64
}

public fun flash_loan<T>(_user: &signer, amount:u64): (Coin<T>, Receipt<T>){
    let coin, fee = withdraw(user, amount);
    (coin,Receipt { amount: amount + fee})
}

public fun repay_flash_loan<T>(rec: Receipt<T>, coins: Coin<T>){
    let Receipt{ amount } = rec;
    assert!(coin::value<T>(&coin) >= rec.amount, 0);
    deposit(coin);
}
```

### Resource management and Unbounded Execution

Effective resource management and unbounded execution prevention are important for maintaining security and gas efficiency in protocol. It's essential to consider these aspects in contract design:

1. Avoid iterating over a publicly accessible structure that allows for unlimited entries, where any number of users can contribute without constraints.
2. Store user-specific assets, such as coins and NFTs, within individual user accounts.
3. Keep module or package-related information within Objects, separate from user data.
4. Instead of combining all user operations in a single shared global space, separating them by individual users.

#### Impact

The negligence of these aspects allowing an attacker to deplete the gas and abort the transaction. This can block application functionalities.

#### Example Insecure Code

The code below shows a loop iterating over every open order and could potentially be blocked by registering many orders:

```move
public fun get_order_by_id(order_id: u64): Option<Order> acquires OrderStore{
    let order_store = borrow_global_mut<OrderStore>(@admin);
    let i = 0;
    let len = vector::length(&order_store.orders);
    while (i < len) {
        let order = vector::borrow<Order>(&order_store.orders, i);
        if (order.id == order_id) {
            return option::some(*order)
        };
        i = i + 1;
    };
    return option::none<Order>()
}
//O(1) in time and gas operation.
public entry fun create_order(buyer: &signer) { ... }
```

#### Example Secure Code

It's recommended to structure the order management system in a way that each user's orders are stored in their respective account rather than in a single global order store. This approach not only enhances security by isolating user data but also improves scalability by distributing the data load. Instead of using **`borrow_global_mut<OrderStore>(@admin)`** which accesses a global store, the orders should be accessed through the individual user's account.

```move
public fun get_order_by_id(user: &signer order_id: u64): Option<Order> acquires OrderStore{
    let order_store = borrow_global_mut<OrderStore>(signer::address_of(user));
     if (smart_table::contains(&order_store.orders, order_id)) {
        let order = smart_table::borrow(&order_store.orders, order_id);
        option::some(*order)
    } else {
        option::none<Order>()
    }
```

It is also advisable to utilize efficient data structures tailored to the specific needs of the operations being performed. For instance, a **`SmartTable`** can be particularly effective in this context.

### Move Abilities

Move's abilities are a set of permissions that control the possible actions on data structures within the language. Smart contract developers must handle these capabilities with care, ensuring they're only assigned where necessary and understanding their implications to prevent security vulnerabilities.

| Ability | Description                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| copy    | Permits the duplication of values, allowing them to be used multiple times within the contract.                        |
| drop    | Allows values to be discarded from memory, which is necessary for controlling resources and preventing leaks.          |
| store   | Enables data to be saved in the global storage, critical to persist data across transactions.                          |
| key     | Grants data the ability to serve as a key in global storage operations, important for data retrieval and manipulation. |

[Read more](https://aptos.dev/move/book/abilities/) about abilities.

Incorrect usage of abilities can lead to security issues such as unauthorized copying of sensitive data (`copy`), resource leaks (`drop`), and global storage mishandling (`store`).

#### Example Insecure Code

```move
struct Token has copy { }
struct FlashLoan has drop { }
```

- `copy` capability for a `Token` allows tokens to be replicated, potentially enabling double-spending and inflation of the token supply, which could devalue the currency.
- Allowing the `drop` capability in a `FlashLoan` struct could permit borrowers to get out of their loan by destroying it before repayment.

## Arithmetic Operations

---

### Division Precision

Arithmetic operations that decrease precision by rounding down could lead protocols to underreport the outcome of these computations.

Move includes six unsigned integer data types: `u8`, `u16`, `u32`, `u64`, `u128`, and `u256`. Division operations in Move truncate any fractional part, effectively rounding down to the nearest whole number, potentially causing protocols to underrepresent the result of such calculations.

Rounding errors in calculations can have wide-ranging impacts, potentially causing financial imbalances, data inaccuracies, and flawed decision-making processes. These errors can result in a loss of revenue, give undue benefits, or even pose safety risks, depending on the context. Accurate and precise computation is essential to maintain system reliability and user confidence.

#### Example Insecure Code

```move
public fun calculate_protocol_fees(size: u64): (u64) {
    return size * PROTOCOL_FEE_BPS / 10000
}
```

If `size` is less than `10000 / PROTOCOL_FEE_BPS`, the fee will round down to 0, effectively enabling a user to interact with the protocol without incurring any fees.

#### Example Secure Code

The following examples outlines two distinct strategies to mitigate the issue in the code:

- Set a minimum order size threshold that is greater than `10000 / PROTOCOL_FEE_BPS`, ensuring that the fee will never round down to zero.

```move
const MIN_ORDER_SIZE: u64 = 10000 / PROTOCOL_FEE_BPS + 1;

public fun calculate_protocol_fees(size: u64): (u64) {
    assert!(size >= MIN_ORDER_SIZE, 0);
    return size * PROTOCOL_FEE_BPS / 10000
}
```

- Check that fees are non-zero and handle the situation specifically, for example by set a minimum fee or rejecting the transaction.

```move
public fun calculate_protocol_fees(size: u64): (u64) {
    let fee = size * PROTOCOL_FEE_BPS / 10000;
    assert!(fee > 0, 0);
    return fee;
}
```

### Integer Considerations

In Move, the security around integer operations is designed to prevent overflow and underflow which can cause unexpected behavior or vulnerabilities. Specifically:

- Additions (`+`) and multiplications (`*`) cause the program to abort if the result is too large for the integer type. An abort in this context means that the program will terminate immediately.
- Subtractions (`-`) abort if the result is less than zero.
- Division (`/`) abort if the divisor is zero.
- Left Shift (`<<`), uniquely, does not abort in the event of an overflow. This means if the shifted bits exceed the storage capacity of the integer type, the program will not terminate, resulting in incorrect values or unpredictable behavior.

[Read more](https://aptos.dev/move/book/integers/#operations) about operations.

Bad operations could unexpectedly alter the correct execution of the smart contract, either by causing an unwanted abort or by calculating inaccurate data.

## Aptos Objects

---

### ConstructorRef leak

When creating objects ensure to never expose the object’s `ConstructorRef` as it allows adding resources to an object. A `ConstructorRef` can also be used to generate other capabilities (or "Refs") that are used to alter or transfer the ownership the object. [Read more](https://aptos.dev/standards/aptos-object/#object-capabilities-refs) about Objects capabilities.

#### Example Vulnerable code

For example, if a `mint` function returns the `ConstructorRef` for an NFT, it can be transformed to a `TransferRef` , stored in global storage, and can allow the original owner to transfer the NFT back after it’s being sold.

```move
public fun mint(creator: &signer): ConstructorRef {
    let constructor_ref = token::create_named_token(
        creator,
        "Collection Name",
        "Collection Description",
        "Token",
        option::none,
        "https://mycollection/token.jpeg",
    );
    constructor_ref
}
```

#### Example Secure Code

Don’t return `CostructorRef` in the `mint` function:

```move
public fun mint(creator: &signer) {
    let constructor_ref = token::create_named_token(
        creator,
        "Collection Name",
        "Collection Description",
        "Token",
        option::none,
        "https://mycollection/token.jpeg",
    );
}
```

### Object Accounts

In the Aptos Framework, multiple `key`-able resources can be stored at a single object account.

However, objects should be isolated to different account, otherwise modifications to one object within an account can influence the entire collection.

For example, transferring one resource implies the transfer of all group members, since the transfer function operates on `ObjectCore`, which is essentially a general tag for all resources at the account.

[Read more](https://aptos.dev/standards/aptos-object/) about Aptos Objects.

#### Example Insecure Code

The `mint_two` function lets `sender` create a `Monkey` for themselves and send a `Toad` to `recipient` .

As `Monkey` and `Toad` belong to the same object account the result is that both objects’ are now owned by the `recipient` .

```move
#[resource_group(scope = global)]
struct ObjectGroup { }

#[resource_group_member(group = 0x42::module::ObjectGroup)]
struct Monkey has store, key { }

#[resource_group_member(group = 0x42::module::ObjectGroup)]
struct Toad has store, key { }

fun mint_two(sender: &signer, recipient: &signer) {
    let constructor_ref = &Object::create_object_from_account(sender);
    let sender_object_signer = Object::generate_signer(constructor_ref);
    let sender_object_addr = object::address_from_constructor_ref(constructor_ref);

    move_to(sender_object_signer, Monkey{});
    move_to(sender_object_signer, Toad{});
    let monkey_object: Object<Monkey> = object::address_to_object<Monkey>(sender_object_addr);
    object::transfer<Monkey>(sender, monkey_object, signer::address_of(recipient));
}
```

#### Example Secure Code

In this example, objects should be stored at separate object accounts:

```move
#[resource_group(scope = global)]
struct ObjectGroup { }

#[resource_group_member(group = 0x42::module::ObjectGroup)]
struct Monkey has store, key { }

#[resource_group_member(group = 0x42::module::ObjectGroup)]
struct Toad has store, key { }


fun mint_two(sender: &signer, recipient: &signer) {
    let sender_address = signer::address_of(sender);

    let constructor_ref_monkey = &Object::create_object(sender_address);
    let constructor_ref_toad = &Object::create_object(sender_address);
    let object_signer_monkey = Object::generate_signer(&constructor_ref_monkey);
    let object_signer_toad = Object::generate_signer(&constructor_ref_toad);

    move_to(object_signer_monkey, Monkey{});
    move_to(object_signer_toad, Toad{});

    let object_address_monkey = signer::address_of(&object_signer_monkey);

    let monkey_object: Object<Monkey> = object::address_to_object<Monkey>(object_address_monkey);
    object::transfer<Monkey>(sender, monkey_object, signer::address_of(recipient));
}
```

## Business logic

---

### Front-running

Front-running involves executing transactions ahead of others by exploiting knowledge of future actions already made by others. This tactic gives front-runners an unfair advantage, as they can anticipate and benefit from the outcomes of these pending transactions.

Front-running can undermine the fairness and integrity of a decentralized application. It can lead to loss of funds, unfair advantages in games, manipulation of market prices, and a general loss of trust in the platform

#### Example Insecure Code

In a lottery scenario, users participate by selecting a number from 1 to 100. At a certain point, the game administrator invokes the function `set_winner_number` to set the winning number. Subsequently, in a separate transaction, the administrator reviews all player bets to determine the winner via `evaluate_bets_and_determine_winners`.

A front-runner observing the winning number set by `set_winner_number` could attempt to submit a late bet or modify an existing bet to match the winning number before `evaluate_bets_and_determine_winners` executes.

```move
struct LotteryInfo {
    winning_number: u8,
    is_winner_set: bool,
}

struct Bets { }

public fun set_winning_number(admin: &signer, winning_number: u8) {
    assert!(signer::address_of(admin) == @admin, 0);
    assert!(winning_number < 10,0);
    let lottery_info = LotteryInfo { winning_number, is_winner_set: true };
    move_to<LotteryInfo>(admin, lottery_info);
}

public fun evaluate_bets_and_determine_winners(admin: &signer) acquires LotteryInfo, Bets {
    assert!(signer::address_of(admin) == @admin, 0);
    let lottery_info = borrow_global<LotteryInfo>(admin);
    assert(lottery_info.is_winner_set, 1);

    let bets = borrow_global<Bets>(admin);
    let winners: vector<address> = vector::empty();

    let winning_bets_option = smart_table::borrow_with_default(&bets.bets, lottery_info.winning_number, &vector::empty());

    vector::iter(winning_bets_option, |bet| {
       vector::push_back(&mut winners, bet.player);
    });
    distribute_rewards(&winners);
}
```

#### Example Secure Code

An effective strategy to avoid front-running could be implementing a `finalize_lottery` function that reveals the answer and concludes the game within a single transaction, and making the other functions private. This approach guarantees that as soon as the answer is disclosed, the system no longer accepts any new answers, thereby eliminating the chance for front-running.

```move
public fun finalize_lottery(admin: &signer, winning_number: u64) {
    set_winner_number(admin, winning_number);
    evaluate_bets_and_determine_winners(admin);
}

fun set_winning_number(admin: &signer, winning_number: u64) { }

fun evaluate_bets_and_determine_winners(admin: &signer) acquires LotteryInfo, Bets { }
```

### Price Oracle Manipulation

In Defi applications, price oracles that utilize the liquidity ratio of tokens in a pair to determine prices for transactions can be vulnerable to manipulation. This susceptibility arises from the fact that the liquidity ratio can be influenced by market participants who hold a significant amount of tokens. When these participants strategically increase or decrease their token holdings, it can impact the liquidity ratio and consequently affect the prices determined by the price oracle, potentially draining the pool.

We recommend to use multiple oracles to determine prices.

#### Secure Code Example

Thala, for example, utilizes a tiered-oracle design. The system has a primary and a secondary oracle. Should one of the oracles fail, the other one serves as a backup based on a sophisticated switching logic. The system is designed with adversarial situations in mind, and strives to provide highly accurate price feeds with minimal governance interaction all the time.

For more in-depth information, refer to [Thala's documentation](https://docs.thala.fi/thala-protocol-design/move-dollar-mod/oracles).

### Token Identifier Collision

When dealing with tokens, ensure that the method for comparing token structs to establish a deterministic ordering does not lead to collisions. Concatenating the address, module, and struct names into a vector is insufficient, as it does not differentiate between similar names that should be treated as unique.

As a consequence, the protocol may erroneously reject legitimate swap pairs due to collisions in token struct comparisons. This oversight could compromise the integrity of swap operations, leading to a loss of funds.

#### Example Insecure Code

The `get_pool_address` function creates a unique address for a liquidity pool associated with trading pairs of fungible assets. It generates and returns an address that serves as a distinct identifier for the liquidity pool of the specified two tokens.

However, users have the freedom to create an `Object<Metadata>` with any symbol they choose. This flexibility could lead to the creation of `Object<Metadata>` instances that mimic other existing instances. This issue might result in a seed collision, which in turn could cause a collision in the generation of the pool address.

```move
public fun get_pool_address(token_1: Object<Metadata>, token_2: Object<Metadata>): address {
    let token_symbol = string::utf8(b"LP-");
    string::append(&mut token_symbol, fungible_asset::symbol(token_1));
    string::append_utf8(&mut token_symbol, b"-");
    string::append(&mut token_symbol, fungible_asset::symbol(token_2));
    let seed = *string::bytes(&token_symbol);
    object::create_object_address(&@swap, seed)
}
```

#### Example Secure Code

`object::object_address` returns an unique identifier for each `Object<Metadata>`

```move
public fun get_pool_address(token_1: Object<Metadata>, token_2: Object<Metadata>): address {
    let seeds = vector[];
    vector::append(&mut seeds, bcs::to_bytes(&object::object_address(&token_1)));
    vector::append(&mut seeds, bcs::to_bytes(&object::object_address(&token_2)));
    object::create_object_address(&@swap, seed)
}
```

## Operations

---

### Pausing functionality

Protocols should have the ability to pause operations effectively. For immutable protocols, a built-in pause functionality is necessary. Upgradable protocols can achieve pausing either through smart contract functionality or via protocol upgrades. Teams should be equipped with automation for the quick and efficient execution of this process.

The absence of a pausing mechanism can lead to prolonged exposure to vulnerabilities, potentially resulting in significant losses. An efficient pausing functionality allows for prompt response to security threats, bugs, or other critical issues, minimizing the risk of exploitation and ensuring the safety of user assets and protocol integrity.

#### Example Secure Code

Example of how to integrate a pause functionality

```move
struct State {
    is_paused: bool,
}

public entry fun pause_protocol(admin: &signer) {
    let state = borrow_global_mut<State>(@protocol_address);
    state.is_paused = true;
}

public entry fun resume_protocol(admin: &signer) {
    let state = borrow_global_mut<State>(@protocol_address);
    state.is_paused = false;
}

public fun main(user: &signer) {
    let state = borrow_global<State>(@protocol_address);
    assert!(!state.is_paused, 0);
    [...]
}
```

### Smart contract publishing key management

Using the same account for testnet and mainnet poses a security risk, as testnet private keys, often stored in less secure environments (ex. laptops), can be more easily exposed or leaked. An attacker that can obtain the private key for the the testnet smart contract would be able to upgrade the mainnet one.
