---
title: "Indexer API Reference"
---

# TODOs BEFORE MERGING
Decisions:
1. For tables which have nested data structures, how deep should this page go? (Do we stop at the first level? Case-by-case basis?)
    - For now, I've only included the 1st level of data. I'm worried things will be too cluttered otherwise, but it'd be much better reference material if so. - Jackson

Work to do:
1. Add public-facing descriptions for each table.
2. Add the type information and descriptions to "good to use" tables.
3. Provide alternatives for deprecated tables if there are any.
4. If there is a better grouping for these tables, update that.
5. (Optional) Provide an example use case for the table to the description.
6. (Optional) Change the date on the deprecation notice. (I guessed for it, assumed all would have the same date, and applied the notice both to the "deprecation" and the "private" fields - so please correct me where I'm wrong!)

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
Remember to use Ctrl + F to find the table you are interested in!
:::

## General

### `account_transactions`
_Has an aggregate view for summary data called `account_transactions_aggregate`_

mapping between accounts to transactions that touch that account

| Field                        | Type | Description |
|------------------------------|------|-------------|
| coin_activities              |      |             |
| coin_activities_aggregate    |      |             |
| delegated_staking_activities |      |             |
| fungible_asset_activities    |      |             |
| token_activities             |      |             |
| token_activities_aggregate   |      |             |
| token_activities_v2          |      |             |
| token_activities_v2_aggregate|      |             |
| transaction_version          |      |             |

### `ledger_infos`
which chain, should be largely irrelevant

| Field         | Type | Description |
|---------------|------|-------------|
| chain_id      |      |             |

### `processor_status`
gives you latest version processed per “processor”

| Field                     | Type | Description |
|---------------------------|------|-------------|
| last_success_version      |      |             |
| last_transaction_timestamp|      |             |
| last_updated              |      |             |
| processor                 |      |             |

## NFT

### `token_activities_v2`
_Has an aggregate view for summary data called `token_activities_v2_aggregate`_

NFT activities, include both v1 and v2

| Field                     | Type | Description |
|---------------------------|------|-------------|
| aptos_names_owner         |      |             |
| aptos_names_owner_aggregate|     |             |
| aptos_names_to            |      |             |
| aptos_names_to_aggregate  |      |             |
| coin_amount               |      |             |
| coin_type                 |      |             |
| collection_data_id_hash   |      |             |
| collection_name           |      |             |
| creator_address           |      |             |
| current_token_data        |      |             |
| event_account_address     |      |             |
| event_creation_number     |      |             |
| event_index               |      |             |
| event_sequence_number     |      |             |
| from_address              |      |             |
| name                      |      |             |
| property_version          |      |             |
| to_address                |      |             |
| token_amount              |      |             |
| token_data_id_hash        |      |             |
| transaction_timestamp     |      |             |
| transaction_version       |      |             |
| transfer_type             |      |             |

### `nft_metadata_crawler_parsed_asset_uris`
cdn of the images for nfts

| Field                          | Type | Description |
|--------------------------------|------|-------------|
| animation_optimizer_retry_count|      |             |
| asset_uri                      |      |             |
| cdn_animation_uri              |      |             |
| cdn_image_uri                  |      |             |
| cdn_json_uri                   |      |             |
| image_optimizer_retry_count    |      |             |
| json_parser_retry_count        |      |             |
| raw_animation_uri              |      |             |
| raw_image_uri                  |      |             |

### `current_token_ownerships_v2`
_Has an aggregate view for summary data called `current_token_ownerships_v2_aggregate`_

who owns which nft, includes token v1. Note, fungible tokens are exceptions. They are currently in all the token tables but we might want to remove them.

| Field                        | Type | Description |
|------------------------------|------|-------------|
| amount                       |      |             |
| aptos_name                   |      |             |
| collection_data_id_hash      |      |             |
| collection_name              |      |             |
| creator_address              |      |             |
| current_collection_data      |      |             |
| current_token_data           |      |             |
| last_transaction_timestamp   |      |             |
| last_transaction_version     |      |             |
| name                         |      |             |
| owner_address                |      |             |
| property_version             |      |             |
| table_type                   |      |             |
| token_data_id_hash           |      |             |
| token_properties             |      |             |

### `current_token_datas_v2`
metadata of each nft, including uri, etc, includes token v1.

| Field                           | Type | Description |
|---------------------------------|------|-------------|
| aptos_name                      |      |             |
| cdn_asset_uris                  |      |             |
| collection_id                   |      |             |
| current_collection              |      |             |
| current_token_ownerships        |      |             |
| current_token_ownerships_aggregate|    |             |
| decimals                        |      |             |
| description                     |      |             |
| is_fungible_v2                  |      |             |
| largest_property_version_v1     |      |             |
| last_transaction_timestamp      |      |             |
| last_transaction_version        |      |             |
| maximum                         |      |             |
| supply                          |      |             |
| token_data_id                   |      |             |
| token_name                      |      |             |
| token_properties                |      |             |
| token_standard                  |      |             |
| token_uri                       |      |             |

### `current_collections_v2`
metadata for each nft collection, includes token v1

| Field                        | Type | Description |
|------------------------------|------|-------------|
| cdn_asset_uris               |      |             |
| collection_id                |      |             |
| collection_name              |      |             |
| creator_address              |      |             |
| current_supply               |      |             |
| description                  |      |             |
| last_transaction_timestamp   |      |             |
| last_transaction_version     |      |             |
| max_supply                   |      |             |
| mutable_description          |      |             |
| mutable_uri                  |      |             |
| table_handle_v1              |      |             |
| token_standard               |      |             |
| total_minted_v2              |      |             |
| uri                          |      |             |

### `current_collection_ownership_v2_view`
_Has an aggregate view for summary data called `current_collection_ownership_v2_view_aggregate`_

a view that groups owners and collection, and provides the count of distinct nfts owned

| Field                        | Type | Description |
|------------------------------|------|-------------|
| collection_id                |      |             |
| collection_name              |      |             |
| collection_uri               |      |             |
| creator_address              |      |             |
| current_collection           |      |             |
| distinct_tokens              |      |             |
| last_transaction_version     |      |             |
| owner_address                |      |             |
| single_token_uri             |      |             |

## Fungible Assets

### `fungible_asset_metadata`
documentation for each fungible asset, e.g. decimals, supply, etc, includes coin v1

| Field                                | Type | Description |
|--------------------------------------|------|-------------|
| asset_type                           |      |             |
| creator_address                      |      |             |
| decimals                             |      |             |
| icon_uri                             |      |             |
| last_transaction_timestamp           |      |             |
| last_transaction_version             |      |             |
| name                                 |      |             |
| project_uri                          |      |             |
| supply_aggregator_table_handle_v1    |      |             |
| supply_aggregator_table_key_v1       |      |             |
| symbol                               |      |             |
| token_standard                       |      |             |

### `fungible_asset_activities`
fungible asset activities, includes coin v1

| Field                           | Type | Description |
|---------------------------------|------|-------------|
| amount                          |      |             |
| asset_type                      |      |             |
| block_height                    |      |             |
| entry_function_id_str           |      |             |
| event_index                     |      |             |
| gas_fee_payer_address           |      |             |
| is_frozen                       |      |             |
| is_gas_fee                      |      |             |
| is_transaction_success          |      |             |
| metadata                        |      |             |
| owner_address                   |      |             |
| owner_aptos_names               |      |             |
| owner_aptos_names_aggregate     |      |             |
| storage_id                      |      |             |
| storage_refund_amount           |      |             |
| token_standard                  |      |             |
| transaction_timestamp           |      |             |
| transaction_version             |      |             |
| type                            |      |             |

### `current_fungible_asset_balances`
_Has an aggregate view for summary data called `current_fungible_asset_balances_aggregate`_

fungible asset balances per owner, includes coin v1

| Field                       | Type | Description |
|-----------------------------|------|-------------|
| amount                      |      |             |
| asset_type                  |      |             |
| is_frozen                   |      |             |
| is_primary                  |      |             |
| last_transaction_timestamp  |      |             |
| last_transaction_version    |      |             |
| metadata                    |      |             |
| owner_address               |      |             |
| storage_id                  |      |             |
| token_standard              |      |             |

## Aptos Naming Service (ANS)

### `current_aptos_names`
_Has an aggregate view for summary data called `current_aptos_names_aggregate`_

view created based on current_ans_lookup_v2 for easy query

| Field                       | Type | Description |
|-----------------------------|------|-------------|
| domain                      |      |             |
| domain_with_suffix          |      |             |
| expiration_timestamp        |      |             |
| is_active                   |      |             |
| is_domain_owner             |      |             |
| is_primary                  |      |             |
| last_transaction_version    |      |             |
| owner_address               |      |             |
| registered_address          |      |             |
| subdomain                   |      |             |
| token_name                  |      |             |
| token_standard              |      |             |

### `current_ans_lookup_v2`
raw table for current_aptos_names

| Field                     | Type | Description |
|---------------------------|------|-------------|
| domain                    |      |             |
| expiration_timestamp      |      |             |
| is_deleted                |      |             |
| last_transaction_version  |      |             |
| registered_address        |      |             |
| subdomain                 |      |             |
| token_name                |      |             |
| token_standard            |      |             |

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
