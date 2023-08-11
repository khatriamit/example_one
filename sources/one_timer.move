module example_one::one_timer{
  use sui::transfer;
  use sui::object::{Self, UID};
  use sui::tx_context::{Self, TxContext};

  /// The one kind created in the module initializer
  struct CreatorCapability has key{
    id:UID
  }

  #[allow(unused_function)]
  /// This function is only called once the module is published
  /// Use it to make sure something has happened only once, like 
  /// here- only module owner will own a version of a
  /// 'CreatorCapability' struct
  fun init(ctx:&mut TxContext){
    transfer::transfer(CreatorCapability{
      id:object::new(ctx),
    }, tx_context::sender(ctx))
  }
}