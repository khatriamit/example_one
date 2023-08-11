module example_one::profile{
  use sui::transfer;
  use sui::url::{Self, Url};
  use std::string::{Self, String};
  use sui::tx_context::{Self, TxContext};

  // using Wrapper functionality
  use 0x0::wrapper;

  /// Profile information, not an object, can be wrapped
  /// into a transferable container. 
  struct ProfileInfo has store {
    name: String,
    url: Url
  }

  /// Read 'name' field from 'ProfileInfo'. 
  public fun name(info: &ProfileInfo): &String{
    &info.name
  }

  /// Read 'url' field from 'ProfileInfo'. 
  public fun url(info: &ProfileInfo): &Url{
    &info.url 
  }

  /// Creates new 'ProfileInfo' and wraps into 'Wrapper'.
  /// Then transfers to sender. 
  public fun create_profile(
    name: vector<u8>, url: vector<u8>, ctx: &mut TxContext
  ){
    // create a new container and wrap ProfileInfo into it
    let container = wrapper::create(ProfileInfo{
      name: string::utf8(name),
      url: url::new_unsafe_from_bytes(url)
    }, ctx);

    // 'Wrapper' type is freely transferable
    transfer::public_transfer(container, tx_context::sender(ctx)) 
  }
}