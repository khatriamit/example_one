module example_one::example_coin{
  use std::option;
  use sui::object::{Self, UID};
  use sui::coin::{Self, TreasuryCap, Coin};
  use sui::balance::{Balance};
  use sui::transfer;
  use sui::tx_context::{Self,TxContext};

  struct EXAMPLE_COIN has drop {}

  struct Faucet has key{
    id:UID,
    cap:TreasuryCap<EXAMPLE_COIN>
  }

  fun init(otw:EXAMPLE_COIN, ctx:&mut TxContext){
    let (cap, metadata)=coin::create_currency(otw, 6, b"EXAMPLE_COIN", b"Example Coin", b"Example Coin", option::none(), ctx);

    transfer::public_transfer(metadata, tx_context::sender(ctx));
    transfer::share_object(Faucet{
      id: object::new(ctx),
      cap:cap
    });
  }

  public fun faucet_mint(faucet: &mut Faucet, ctx:&mut TxContext): Coin<EXAMPLE_COIN>{
    coin::mint(&mut faucet.cap, 1_000_000, ctx)
  }

  public fun faucet_mint_balance(faucet:&mut Faucet): Balance<EXAMPLE_COIN> {
    coin::mint_balance(&mut faucet.cap, 1_000_000)
  }
}