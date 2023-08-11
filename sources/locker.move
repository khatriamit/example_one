module example_one::locker{
    use sui::dynamic_object_field as dof;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;


    const EWrongItemReturned: u64 = 0;

    struct MustDestroyThis {
        item_id: address
    }

    struct Locker has key, store {
        id: UID
    }

    fun init (ctx: &mut TxContext) {
        let locker = Locker {
            id: object::new(ctx)
        };

        transfer::public_share_object(locker);
    }


    public fun lock_item<T: key+store> (item: T, locker: &mut Locker) {
        dof::add<address, T>(&mut locker.id, object::id_address(&item), item);
    }

    public fun borrow_item<T: key+store>(item_id: address, locker: &mut Locker): (T, MustDestroyThis) {
        let item = dof::remove<address, T>(&mut locker.id, item_id);
        let hot_potato = MustDestroyThis{
            item_id
        };

        (item, hot_potato)
    }

    public fun return_item<T: key+store>(item: T, hot_potato: MustDestroyThis, locker: &mut Locker) {
        let MustDestroyThis {item_id} = hot_potato;
        let actual_id: address = object::id_address(&item); 
        assert!(item_id == actual_id, EWrongItemReturned);
        
        // In some cases it might make sense for the item to be sent to the address.
        // In those particular instances it is recommended to use transfer::public_transfer
        // to make sure the item goes to the correct address (eg: the one written in the hot potato).
        dof::add<address, T>(&mut locker.id, actual_id, item);
    }

    // anti-pattern: PTB's can't work yet with references
    public fun anti_borrow_item<T: key+store>(item_id: address, locker: &mut Locker): &mut T {
        dof::borrow_mut<address, T>(&mut locker.id, item_id)
    } 


}
