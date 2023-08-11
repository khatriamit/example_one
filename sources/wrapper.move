/// A freely transfererrable Wrapper for custom data
module example_one::wrapper{
  use sui::object::{Self, UID};
  use sui::tx_context::TxContext;

  /// An object with 'store' can be transferred in any
  /// module without a custom transfer implementation. 
  struct Wrapper<T: store> has key, store {
    id: UID,
    contents: T
  }

  /// View function to read contents of a 'Container'. 
  public fun contents<T: store> (c: &Wrapper<T>): &T{
    &c.contents
  }

  /// Anyone can create a new object
  public fun create<T: store>(contents: T, ctx: &mut TxContext): Wrapper<T>{
    Wrapper{
      contents,
      id: object::new(ctx),
    }
  }

  /// Destroy 'Wrapper' and get T. 
  public fun destroy<T: store>(c: Wrapper<T>): T{
    let Wrapper {id, contents} = c;
    object::delete(id);
    contents
  }
}