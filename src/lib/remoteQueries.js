let fields =
    "id, username, location, bio, email, full_name, website, twitter, instagram, avatar_url, address, multisig, pubkey, is_artist";

let privateFields = "mnemonic, wallet_initialized, is_admin, info";

let computed = "followed, num_follows, num_followers";

export const updateUser = `mutation update_user($user: users_set_input!, $id: uuid!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $user) {
      ${fields}
      wallet_initialized
      ${computed}
    }
  }`;

let artFields = `
id,
asset
edition
editions
held
title
description
artist_id
owner_id
has_royalty
royalty_recipients {
  id
  name
  artwork_id
  asking_asset
  amount
  address
  type
}
filename
filetype
favorited
list_price
reserve_price
last_active
created_at
auction_start
auction_end
list_price_tx
asking_asset
bid_increment
extension_interval
max_extensions
slug
is_physical
instagram
ticker
views
transferred_at
is_sold
locked_by
owner {
  id
  username
  avatar_url
  address
  pubkey
},
artist {
  id
  address
  username
  avatar_url
},
bid {
  id
  user {
    id
    username
  } 
  amount 
}
`;

export const getArtworks = `query($where: artworks_bool_exp!, $limit: Int, $offset: Int, $order_by: artworks_order_by!) {
    artworks(where: $where, limit: $limit, offset: $offset, order_by: [$order_by]) {
       ${artFields}
       tags {
         tag
       } 
     }
   }`;