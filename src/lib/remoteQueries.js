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