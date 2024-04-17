---
title: "Indexer API Reference"
---

# TODOs BEFORE MERGING
1. Provide alternatives for deprecated tables if there are any.
2. Review the descriptions for the tables for accuracy.
3. Review the types and descriptions for fields for accuracy.
4. (Optional) Provide an example use case for the table to the description.
5. (Optional) Change the date on the deprecation notice if we want to. (I guessed for it, assumed all would have the same date, and applied the notice both to the "deprecation" and the "private" fields - so please correct me where I'm wrong!)

Don't worry about the formatting on whitespace for "Description" and such - I'll run a script afterwards before we merge to fix the whitespacing - Jackson

# Indexer API Reference

The Indexer API allows you to access rich data about tokens, accounts, transactions, and events on-chain using GraphQL queries.

You can interactively explore the data discussed here using Hasura explorers here:
- Mainnet: https://cloud.hasura.io/public/graphiql?endpoint=https://api.mainnet.aptoslabs.com/v1/graphql
- Testnet: https://cloud.hasura.io/public/graphiql?endpoint=https://api.testnet.aptoslabs.com/v1/graphql
- Devnet: https://cloud.hasura.io/public/graphiql?endpoint=https://api.devnet.aptoslabs.com/v1/graphql

Or via code at the following endpoints:
- Mainnet: https://api.mainnet.aptoslabs.com/v1/graphql
- Testnet: https://api.testnet.aptoslabs.com/v1/graphql
- Devnet: https://api.devnet.aptoslabs.com/v1/graphql

As you explore, you can refer back to these reference docs to understand the tables you are interested in. You should use Ctrl + F to quickly find the right entry for that table.

At the bottom of this page we list the tables which are deprecated, along with any alternatives which may replace them. Make sure to check before building any production infrastructure that the table you are using is not deprecated as there was recently a v2 which dramatically simplified the list of tables.

:::tip
If you are looking up a table with the `_by_pk` suffix, search for the table name without that suffix. `_by_pk` tables are automatically generated for convenience to allow querying by primary key.
:::

# Indexer Table Reference
:::tip
Remember to use Ctrl + F to find the table you are interested in! When in doubt, you may also want to query the Hasura tables above to see examples of the data inside.
:::

## General

### `account_transactions`
_Has an aggregate view for summary data called `account_transactions_aggregate`_

This table maps accounts and transactions that interact with that account.

| Field                        | Type    | Description |
|------------------------------|---------|-------------|
| account_address              | String! | This is an Aptos account address. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| coin_activities              | Table   | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| coin_activities_aggregate    | Table   | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| delegated_staking_activities | Table   | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| fungible_asset_activities    | Table   | References [fungible_asset_activities](#fungible_asset_activities). |
| token_activities             | Table   | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| token_activities_aggregate   | Table   | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| token_activities_v2          | Table   | References [token_activities_v2](#token_activities_v2). |
| token_activities_v2_aggregate| Table   | References [token_activities_v2](#token_activities_v2). |
| transaction_version          | bigint! | Blockchain version of the transaction. Ex. 10000000 |

### `ledger_infos`

This table shares what chain is currently being queried.

| Field         | Type   | Description |
|---------------|--------|-------------|
| chain_id      | String | The unique identifier for the chain you are accessing. Ex. "TESTNET" |

### `processor_status`

This table shares how current this processor's data is.


gives you latest version processed per “processor”

| Field                     | Type   | Description |
|---------------------------|--------|-------------|
| last_success_version      | bigint | The version number of the last successful processor run. Ex. 5000000 |
| last_transaction_timestamp| String | Timestamp of the last processed transaction. Ex. "2024-04-17T02:14:25.68771" |
| last_updated              | String | Timestamp of the last update to this processor's status. Ex. "2024-04-17T02:14:25.68771" |
| processor                 | String | Name of the processor. Ex. "TransactionProcessor" |

## NFT

### `token_activities_v2`
_Has an aggregate view for summary data called `token_activities_v2_aggregate`_

This table tracks token activities and is especially useful for tracking NFT activity. This includes both v1 and v2 data.

| Field                     | Type    | Description |
|-------------------------|-----------|-------------|
| after_value             | String    | The value of a token property after the transaction. Ex. "100" |
| aptos_names_from        | Table     | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| aptos_names_from_aggregate | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| aptos_names_to          | Table     | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| aptos_names_to_aggregate| Table     | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| before_value            | String    | The value of a token property before the transaction. Ex. "50" |
| current_token_data      | Table     | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| entry_function_id_str   | String    | The identifier of the function called in this transaction. Ex. "transfer" |
| event_account_address   | String    | This is an Aptos account address related to the event. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| event_index             | bigint    | Index of the event within the transaction. Ex. 1 |
| from_address            | String    | This is an Aptos account address from which the token was sent. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| is_fungible_v2          | Boolean   | Indicates whether the token is fungible. Ex. False for NFTs. |
| property_version_v1     | bigint    | The version of the token's properties under schema version 1. Ex. 1 |
| to_address              | String    | This is an Aptos account address to which the token was sent. Ex. "0x123abc456def7890abcdef1234567890abcdef1234" |
| token_amount            | bigint    | The amount of the token transferred in this activity. Ex. 3 |
| token_data_id           | bigint    | Unique identifier for this particular token's data. Ex. 123456789 |
| token_standard          | String    | Aptos standard that the collection adheres to. Ex. "v1"  |
| transaction_timestamp   | String    | Timestamp when the transaction occurred. Ex. "2024-04-17T02:14:25.68771" |
| transaction_version     | bigint    | Blockchain version of the transaction. Ex. 10000000 |
| type                    | String    | Type of transfer, e.g., "deposit" or "withdrawal". Ex. "0x3::token::DepositEvent" |

### `nft_metadata_crawler_parsed_asset_uris`

This table allows you to look up the cdn and uris for NFT images / content.

| Field                          | Type   | Description |
|--------------------------------|--------|-------------|
| animation_optimizer_retry_count| Int    | Number of retries to optimize animation. Ex. 3 |
| asset_uri                      | String | URI of the asset. Ex. "https://example.com/nft/123" |
| cdn_animation_uri              | String | Content Delivery Network URI for animation. Ex. "https://cdn.example.com/animations/123" |
| cdn_image_uri                  | String | Content Delivery Network URI for image. Ex. "https://cdn.example.com/images/123" |
| cdn_json_uri                   | String | Content Delivery Network URI for JSON metadata. Ex. "https://cdn.example.com/metadata/123.json" |
| image_optimizer_retry_count    | Int    | Number of retries to optimize image. Ex. 3 |
| json_parser_retry_count        | Int    | Number of retries to parse JSON metadata. Ex. 3 |
| raw_animation_uri              | String | Original URI for animation before CDN optimization. Ex. "https://example.com/raw/animations/123" |
| raw_image_uri                  | String | Original URI for image before CDN optimization. Ex. "https://example.com/raw/images/123" |

### `current_token_ownerships_v2`
_Has an aggregate view for summary data called `current_token_ownerships_v2_aggregate`_

This table tracks who owns which NFTs. This includes both v1 and v2 tokens. Fungible tokens are not tracked as consistently.

| Field                        | Type   | Description |
|------------------------------|--------|-------------|
| amount                       | bigint | The amount of the token owned. Ex. 42 |
| aptos_name                   | String | This is a name tied to this account using the Aptos Name Service (ANS). Ex. "JohnDoe" |
| collection_data_id_hash      | String | This is a hash identifying the data of the collection. Ex. "0xbd0818e81f08ccb0297a2ae80726e5f1a36ef077ad910d5c1efac79a824899f3" |
| collection_name              | String | The name of the collection to which the token belongs. Ex. "CryptoKitties" |
| creator_address              | String | This is an Aptos account address that created the token. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| current_collection_data      | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| current_token_data           | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| last_transaction_timestamp   | String | Timestamp of the last transaction involving the token. Ex. "2024-04-17T02:14:25.68771" |
| last_transaction_version     | bigint | The version number of the last transaction involving the token. Ex. 9000000001 |
| name                         | String | This is a name tied to this token, not necessarily unique. Ex. "GoldenDragon" |
| owner_address                | String | This is an Aptos account address that currently owns the token. Ex. "0xa815a9a09105973084bfc31530e7c8f002846787c2f0521e1e34dc144ad83b89" |
| property_version             | bigint | The version number of the token's properties, which can change over time. Ex. 2 |
| table_type                   | String | The type of the token, usually differentiating between fungible and non-fungible. Ex. "NonFungible" |
| token_data_id_hash           | String | This is a hash that uniquely identifies the token's data. Ex. "0xa815a9a09105973084bfc31530e7c8f002846787c2f0521e1e34dc144ad83b89" |
| token_properties             | Object | Arbitrary data unique to each token. Often null or empty. Ex. { "created": "1687147084" } |

### `current_token_datas_v2`

This table tracks the metadata associated with each NFT (Ex. URI, supply, etc.). This tracks both v1 and v2 tokens.

| Field                           | Type   | Description |
|---------------------------------|--------|-------------|
| aptos_name                      | String | This is a name tied to this token using the Aptos Name Service (ANS). Ex. "EpicDragon" |
| cdn_asset_uris                  | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| collection_id                   | String | Identifier for the collection that includes this token. Ex. "0x360f6eeabb4d7a9d2fab1f35b01e02831e3b5c4b73c7fd6c98dcc1c301c817c8" |
| current_collection              | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| current_token_ownerships        | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| current_token_ownerships_aggregate | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| decimals                        | bigint | Number of decimal places for token value, typically for fungible tokens. Ex. 18 |
| description                     | String | Description of the token. Ex. "A legendary dragon from the mystical lands." |
| is_fungible_v2                  | Boolean| Whether the token is fungible. Ex. False for NFTs |
| largest_property_version_v1     | bigint | The largest version number of the token's properties under the first schema. Ex. 1 |
| last_transaction_timestamp      | bigint | Unix timestamp of the last transaction involving this token. Ex. 2024-03-27T07:41:58.800893 |
| last_transaction_version        | bigint | Blockchain version of the last transaction involving this token. Ex. 30000000 |
| maximum                         | bigint | Maximum possible quantity of this token, relevant for fungibles. Ex. 1000000 |
| supply                          | bigint | Current supply of the token in circulation. Ex. 500000 |
| token_data_id                   | String | Unique identifier for the token's data. Ex. "0xa815a9a09105973084bfc31530e7c8f002846787c2f0521e1e34dc144ad83b89" |
| token_name                      | String | The formal name of the token. Ex. "Mystic Dragon" |
| token_properties                | Object | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| token_standard                  | String | Aptos standard that the collection adheres to. Ex. "v1"  |
| token_uri                       | String | URI linking to further information about the token. Ex. "https://example.com/tokens/987654321" |

### `current_collections_v2`

This table tracks the metadata associated with each NFT collection (Ex. collection_id, creator_address, etc.). This tracks both v1 and v2 tokens.

| Field                        | Type   | Description |
|------------------------------|--------|-------------|
| cdn_asset_uris               | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| collection_id                | String | Unique identifier for the collection. Ex. "0xa815a9a09105973084bfc31530e7c8f002846787c2f0521e1e34dc144ad83b88" |
| collection_name              | String | The formal name of the collection. Ex. "Mythic Dragons" |
| creator_address              | String | This is an Aptos account address that created the collection. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| current_supply               | bigint | Current supply of tokens in this collection. Ex. 500 |
| description                  | String | Description of the collection. Ex. "A collection of rare digital dragons." |
| last_transaction_timestamp   | String | Timestamp of the last transaction involving this collection. Ex. "2024-04-17T02:14:25.68771" |
| last_transaction_version     | bigint | Blockchain version of the last transaction involving this collection. Ex. 3000000002 |
| max_supply                   | bigint | Maximum possible quantity of tokens in this collection. Ex. 1000 |
| mutable_description          | String | Changeable description of the collection. Ex. "Updated collection description." |
| mutable_uri                  | String | URI where updated information about the collection can be found. Ex. "https://example.com/collections/updated-info" |
| table_handle_v1              | String | Legacy identifier handle for the collection in earlier schema versions. Ex. "handle_12345" |
| token_standard               | String | Aptos standard that the collection adheres to. Ex. "v1" |
| total_minted_v2              | bigint | Total number of tokens minted in this collection under schema version 2. Ex. 800 |
| uri                          | String | URI linking to further information about the collection. Ex. "https://example.com/collections/9876543210" |


### `current_collection_ownership_v2_view`
_Has an aggregate view for summary data called `current_collection_ownership_v2_view_aggregate`_

This table maps collections to who owns them and helps count how much of a collection is owned by other accounts.

| Field                        | Type   | Description |
|------------------------------|--------|-------------|
| collection_id                | String | Unique identifier for the collection. Ex. "0xa815a9a09105973084bfc31530e7c8f002846787c2f0521e1e34dc144ad83b89" |
| collection_name              | String | The formal name of the collection. Ex. "Mythic Dragons" |
| collection_uri               | String | URI linking to further information about the collection. Ex. "https://example.com/collections/9876543210" |
| creator_address              | String | This is an Aptos account address that created the collection. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| current_collection           | Table  | Use the [Hasura explorer](#indexer-api-reference) to see these sub-fields. |
| distinct_tokens              | bigint | The count of distinct tokens owned within this collection. Ex. 150 |
| last_transaction_version     | bigint | The version number of the last transaction involving this collection. Ex. 3000000002 |
| owner_address                | String | This is an Aptos account address that currently owns the token. Ex. "0x123abc456def7890abcdef1234567890abcdef1234" |
| single_token_uri             | String | URI linking to information about a specific token within the collection. Ex. "https://example.com/tokens/9876543210" |
| token_standard               | String | Aptos standard that the collection adheres to. Ex. "v1" |


## Fungible Assets

### `fungible_asset_metadata`

This tracks the metadata tied to each fungible asset (ex. decimals of precision). It includes v1 token data.

| Field                                | Type   | Description |
|--------------------------------------|--------|-------------|
| asset_type                           | String | The type of the asset, described by a Move resource. Ex. "0x1::aptos_coin::AptosCoin"  |
| creator_address                      | String | This is an Aptos account address that created the asset. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| decimals                             | bigint | Number of decimal places for token value, typically for fungible tokens. Ex. 18 |
| icon_uri                             | String | URI for the icon of the asset. Ex. "https://cdn.example.com/icons/123" |
| last_transaction_timestamp           | String | Timestamp of the last transaction involving this asset. Ex. "2024-04-17T02:14:25.68771" |
| last_transaction_version             | bigint | Blockchain version of the last transaction involving this asset. Ex. 10000000 |
| name                                 | String | The formal name of the asset. Ex. "Digital Gold" |
| project_uri                          | String | URI linking to the project information associated with this asset. Ex. "https://www.example.com/project_name/" |
| supply_aggregator_table_handle_v1    | String | Legacy handle for the supply aggregator table from an earlier schema version. Ex. "handle_67890" |
| supply_aggregator_table_key_v1       | String | Legacy key for accessing the supply aggregator table in earlier schema versions. Ex. "key_12345" |
| symbol                               | String | The trading symbol of the asset. Ex. "DGOLD" |
| token_standard                       | String | Standard that the asset adheres to. Ex. "v1" |


### `fungible_asset_activities`

This tracks the activity of fungible assets. It includes v1 token data.

| Field                           | Type   | Description |
|---------------------------------|--------|-------------|
| amount                          | bigint | The amount of the asset involved in the activity. Ex. 1000 |
| asset_type                      | String | The type of the asset, described by a Move resource. Ex. "0x1::aptos_coin::AptosCoin" |
| block_height                    | bigint | The blockchain height at which this activity occurred. Ex. 1500000 |
| entry_function_id_str           | String | The identifier of the function called in this transaction. Ex. "transfer" |
| event_index                     | bigint | Index of the event within the transaction. Ex. 1 |
| gas_fee_payer_address           | String | This is an Aptos account address that paid the gas fee for the transaction. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| is_frozen                       | Boolean| Indicates whether the asset is frozen. Ex. False |
| is_gas_fee                      | Boolean| Indicates whether this activity involved a gas fee. Ex. True |
| is_transaction_success          | Boolean| Indicates whether the transaction was successful. Ex. True |
| metadata                        | Object  | Use the [Hasura explorer](#indexer-api-reference) to see fields for `metadata` in this table. |
| owner_address                   | String | This is an Aptos account address that owns the asset. Ex. "0x123abc456def7890abcdef1234567890abcdef1234" |
| owner_aptos_names               | Table  | References [owner_aptos_names](#current_aptos_names). |
| owner_aptos_names_aggregate     | Table  | References [owner_aptos_names](#current_aptos_names). |
| storage_id                      | String | Identifier for the storage used in the transaction. Ex. "0xa815a9a09105973084bfc31530e7c8f002846787c2f0521e1e34dc144ad83b89" |
| storage_refund_amount           | bigint | Amount refunded for storage after the transaction. Ex. 50 |
| token_standard                  | String | Aptos standard that the collection adheres to. Ex. "v1"  |
| transaction_timestamp           | String | Timestamp when the transaction occurred. Ex. "2024-04-17T02:14:25.68771" |
| transaction_version             | bigint | Blockchain version of the transaction. Ex. 2 |
| type                            | String | Type of the transaction, described by a Move entry function. Ex. "0x3::token::TokenStore" |

### `current_fungible_asset_balances`
_Has an aggregate view for summary data called `current_fungible_asset_balances_aggregate`_

This tracks the asset balances of each account on-chain. It includes v1 token data.

| Field                       | Type   | Description |
|-----------------------------|--------|-------------|
| amount                      | bigint | The amount of the asset owned. Ex. 2000 |
| asset_type                  | String | The type of the asset, described by a Move resource. Ex. "0x1::aptos_coin::AptosCoin" |
| is_frozen                   | Boolean| Indicates whether the asset is frozen. Ex. False |
| is_primary                  | Boolean| Indicates whether this is the primary balance of the owner. Ex. True |
| last_transaction_timestamp  | String | Timestamp of the last transaction involving this balance. Ex. "2024-04-17T02:14:25.68771" |
| last_transaction_version    | bigint | Blockchain version of the last transaction involving this balance. Ex. 30000000 |
| metadata                    | Object  | Use the [Hasura explorer](#indexer-api-reference) to see fields for `metadata` in `current_fungible_asset_balances`. |
| owner_address               | String | This is an Aptos account address that owns the asset. Ex. "0xa815a9a09105973084bfc31530e7c8f002846787c2f0521e1e34dc144ad83b89" |
| storage_id                  | String | Identifier for the storage associated with this balance. Ex. "0xa815a9a09105973084bfc31530e7c8f002846787c2f0521e1e34dc144ad83b89" |
| token_standard              | String | Aptos standard that the collection adheres to. Ex. "v1"  |

## Aptos Naming Service (ANS)

### `current_aptos_names`
_Has an aggregate view for summary data called `current_aptos_names_aggregate`_

This view of [`current_ans_lookup_v2`](#current_ans_lookup_v2) helps query by name instead of account.

| Field                       | Type   | Description |
|-----------------------------|--------|-------------|
| domain                      | String | The domain associated with this Aptos name. Ex. "example.crypto" |
| domain_with_suffix          | String | The full domain name including any suffix. Ex. "example.crypto.aptos" |
| expiration_timestamp        | String | Timestamp when the domain registration expires. Ex. "2024-04-17T02:14:25.68771" |
| is_active                   | Boolean| Indicates whether the domain is currently active. Ex. True |
| is_domain_owner             | Boolean| Indicates whether the registered address is the owner of the domain. Ex. False |
| is_primary                  | Boolean| Indicates whether this is the primary domain for the registered address. Ex. True |
| last_transaction_version    | bigint | The version number of the last transaction involving this domain. Ex. 5000000 |
| owner_address               | String | This is an Aptos account address that owns the domain. Ex. "0x123abc456def7890abcdef1234567890abcdef1234" |
| registered_address          | String | This is an Aptos account address registered to the domain. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| subdomain                   | String | Any subdomain part of the domain name. Ex. "sub.example" |
| token_name                  | String | The name of the token associated with this domain. Ex. "ExampleToken" |
| token_standard              | String | Aptos standard that the collection adheres to. Ex. "v1"  |

### `current_ans_lookup_v2`

This table maps tokens, standards, and addresses to human readable names.

| Field                     | Type   | Description |
|---------------------------|--------|-------------|
| domain                    | String | The domain associated with this Aptos name. Ex. "example.crypto" |
| expiration_timestamp      | String | Timestamp when the domain registration expires. Ex. "2024-04-17T02:14:25.68771" |
| is_deleted                | Boolean| Indicates whether the domain registration has been deleted. Ex. False |
| last_transaction_version  | bigint | The version number of the last transaction involving this domain. Ex. 5000000 |
| registered_address        | String | This is an Aptos account address registered to the domain. Ex. "0x50bc83f01d48ab3b9c00048542332201ab9cbbea61bda5f48bf81dc506caa78a" |
| subdomain                 | String | Any subdomain part of the domain name. Ex. "sub.example" |
| token_name                | String | The name of the token associated with this domain. Ex. "ExampleToken" |
| token_standard            | String | Aptos standard that the collection adheres to. Ex. "v1"  |

# Deprecated Tables

The following tables are planned for deprecation, or are already deprecated. See the notes section for any direct replacements or notes on how to migrate if you currently depend on one of these tables. Please do not use any of the below tables for production services.

| Table                                                 | Deprecation Date | Notes |
|-------------------------------------------------------|------------------|-------|
| address_events_summary                                | May 15th         |       |
| address_version_from_events                           | May 15th         |       |
| address_version_from_events_aggregate                 | May 15th         |       |
| address_version_from_move_resources                   | May 15th         |       |
| address_version_from_move_resources_aggregate         | May 15th         |       |
| block_metadata_transactions                           | May 15th         |       |
| coin_activities                                       | May 15th         |       |
| coin_activities_aggregate                             | May 15th         |       |
| coin_balances                                         | May 15th         |       |
| coin_infos                                            | May 15th         |       |
| coin_supply                                           | May 15th         |       |
| collection_datas                                      | May 15th         |       |
| current_ans_lookup                                    | May 15th         |       |
| current_coin_balances                                 | May 15th         |       |
| current_collection_datas                              | May 15th         |       |
| current_delegated_staking_pool_balances               | May 15th         |       |
| current_delegated_voter                               | May 15th         |       |
| current_delegator_balances                            | May 15th         |       |
| current_objects                                       | May 15th         |       |
| current_staking_pool_voter                            | May 15th         |       |
| current_table_items                                   | May 15th         |       |
| current_token_datas                                   | May 15th         |       |
| current_token_ownerships                              | May 15th         |       |
| current_token_ownerships_aggregate                    | May 15th         |       |
| current_token_pending_claims                          | May 15th         |       |
| delegated_staking_activities                          | May 15th         |       |
| delegated_staking_pool_balances                       | May 15th         |       |
| delegated_staking_pool_balances_aggregate             | May 15th         |       |
| delegated_staking_pools                               | May 15th         |       |
| delegator_distinct_pool                               | May 15th         |       |
| delegator_distinct_pool_aggregate                     | May 15th         |       |
| events                                                | May 15th         |       |
| move_resources                                        | May 15th         |       |
| move_resources_aggregate                              | May 15th         |       |
| nft_marketplace_v2_current_nft_marketplace_auctions   | May 15th         |       |
| nft_marketplace_v2_current_nft_marketplace_collection_offers | May 15th         |       |
| nft_marketplace_v2_current_nft_marketplace_listings   | May 15th         |       |
| nft_marketplace_v2_current_nft_marketplace_listings_aggregate | May 15th         |       |
| nft_marketplace_v2_current_nft_marketplace_token_offers | May 15th         |       |
| nft_marketplace_v2_nft_marketplace_activities         | May 15th         |       |
| num_active_delegator_per_pool                         | May 15th         |       |
| proposal_votes                                        | May 15th         |       |
| proposal_votes_aggregate                              | May 15th         |       |
| signatures                                            | May 15th         |       |
| table_items                                           | May 15th         |       |
| table_metadatas                                       | May 15th         |       |
| token_activities                                      | May 15th         |       |
| token_activities_aggregate                            | May 15th         |       |
| token_activities_v2                                   | May 15th         |       |
| token_activities_v2_aggregate                         | May 15th         |       |
| token_datas                                           | May 15th         |       |
| token_ownerships                                      | May 15th         |       |
| tokens                                                | May 15th         |       |
| transaction_version                                   | May 15th         |       |
| user_transactions                                     | May 15th         |       |
