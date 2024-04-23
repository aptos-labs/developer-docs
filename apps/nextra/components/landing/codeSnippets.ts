export const coinsCodeSnippet = `
module 0xCAFE::BasicCoin {
  // Only included in compilation for testing. Similar to #[cfg(testing)]
  // in Rust. Imports the \`Signer\` module from the MoveStdlib package.
  #[test_only]
  use std::signer;

  struct Coin has key {
      value: u64,
  }

  public fun mint(account: signer, value: u64) {
      move_to(&account, Coin { value })
  }

  // Declare a unit test. It takes a signer called \`account\` with an
  // address value of \`0xC0FFEE\`.
  #[test(account = @0xC0FFEE)]
  fun test_mint_10(account: signer) acquires Coin {
      let addr = signer::address_of(&account);
      mint(account, 10);
      // Make sure there is a \`Coin\` resource under \`addr\` with a value of \`10\`.
      // We can access this resource and its value since we are in the
      // same module that defined the \`Coin\` resource.
      assert!(borrow_global<Coin>(addr).value == 10, 0);
  }
}
`.trim();

export const objectsCodeSnippet = `
module 0xCAFE::BasicObject {
  /// Sets up the object, and returns the signer for simplicity
  fun setup_object(constructor_ref: &ConstructorRef, can_transfer: bool) {
      // Lets you get a signer of the object to do anything with it
      let extend_ref = object::generate_extend_ref(constructor_ref);

      // Lets you gate the ability to transfer the object
      let transfer_ref = if (can_transfer) {
          option::some(object::generate_transfer_ref(constructor_ref))
      } else {
          option::none()
      };

      // Lets you delete this object, if possible
      let delete_ref = if (object::can_generate_delete_ref(constructor_ref)) {
          option::some(object::generate_delete_ref(constructor_ref))
      } else {
          option::none()
      };

      // -- Store references --
      // A creator of the object can choose which of these to save, and move them
      // into any object.
      let object_signer = object::generate_signer(constructor_ref);

      move_to(&object_signer, ObjectController {
          extend_ref,
          transfer_ref,
          delete_ref,
      });
  }
}
`;

export const fungibleAssetsCodeSnippet = `
module 0xCAFE::BasicFungibleAsset {
  /// Swaps between two tokens in the pool
  /// This is friend-only as the returned fungible assets might be of an internal
  /// wrapper type. If this is not the case, this function can be made public.
  public(friend) fun swap(
      pool: Object<LiquidityPool>,
      from: FungibleAsset,
  ): FungibleAsset acquires FeesAccounting, LiquidityPool, LiquidityPoolConfigs {
      // ...

      // Deposits and withdraws.
      let pool_data = liquidity_pool_data(&pool);
      let k_before = calculate_constant_k(pool_data);
      let fees_accounting = unchecked_mut_fees_accounting(&pool);
      let store_1 = pool_data.token_store_1;
      let store_2 = pool_data.token_store_2;
      let swap_signer = &package_manager::get_signer();
      let fees_amount = (fees_amount as u128);
      let out = if (from_token == fungible_asset::store_metadata(pool_data.token_store_1)) {
          // User's swapping token 1 for token 2.
          fungible_asset::deposit(store_1, from);
          fungible_asset::deposit(pool_data.fees_store_1, fees);
          fees_accounting.total_fees_1 = fees_accounting.total_fees_1 + fees_amount;
          fungible_asset::withdraw(swap_signer, store_2, amount_out)
      } else {
          // User's swapping token 2 for token 1.
          fungible_asset::deposit(store_2, from);
          fungible_asset::deposit(pool_data.fees_store_2, fees);
          fees_accounting.total_fees_2 = fees_accounting.total_fees_2 + fees_amount;
          fungible_asset::withdraw(swap_signer, store_1, amount_out)
      };

      // ...
  }
}
`;
