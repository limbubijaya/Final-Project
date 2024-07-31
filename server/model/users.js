const knex = require("../db");
const bcrypt = require("bcrypt");
const localUser = "local_user";
const googleUser = "google_user";

class LocalUser {
  static async createLocalUser(
    email,
    password,
    display_name,
    bio,
    profile_pic
  ) {
    const userExists = await knex(localUser).select("*").where("email", email);
    if (userExists.length !== 0) {
      return false;
    }

    //else
    const encryptedPassword = await bcrypt.hash(password, 10);

    const id = await knex(localUser).insert([
      {
        email: email,
        password: encryptedPassword,
        display_name: display_name,
        profile_pic: profile_pic,
        bio: bio,
        is_linked_to_google: false,
      },
    ]);
    console.log("id: ", id);
    if (id == null) {
      return false;
    }
    return { success: true, display_name: display_name };
  }

  static async checkValidEmail(email) {
    const user = await knex(localUser).where({ email: email });
    if (user.length === 0) {
      return true;
    }
    return false;
  }

  static async checkValidDisplayName(display_name) {
    const user = await knex(localUser).where({ display_name: display_name });
    if (user.length === 0) {
      return true;
    }
    return false;
  }

  static async updateUserGoogleLinkage(email, boolean) {
    await knex(localUser)
      .where({ email: email })
      .update({ is_linked_to_google: boolean });
  }

  static async updateLocalUserBio(email, display_name, profile_pic, bio) {
    const user = await knex(localUser).where({ email: email }).first();
    if (user != null) {
      await knex(localUser).where({ email: email }).update({
        display_name: display_name,
        profile_pic: profile_pic,
        bio: bio,
      });
    }
  }

  static async updateLocalUserPassword(email, password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await knex(localUser).where({ email: email }).first();
    if (user != null) {
      await knex(localUser).where({ email: email }).update({
        password: encryptedPassword,
      });
    }
  }

  static async loginLocalUser(email, password) {
    const user = await knex(localUser)
      .select("*")
      .where("email", email)
      .first();
    if (!user) {
      return null;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }
    return user.display_name;
  }

  static async getDisplayName(display_name) {
    return await knex(localUser)
      .select("*")
      .where({ display_name: display_name })
      .first();
  }

  static async loginGoogleUser(email, display_name, googleId) {
    //best way to do is through an transaction

    const userExists = await knex(googleUser)
      .select("*")
      .where("email", email)
      .first();

    if (userExists) {
      return true;
    }

    if (await this.getDisplayName(display_name)) {
      display_name = "" + googleId;
    }

    await this.createGoogleUser(email, googleId);

    const userLocal = await knex(localUser)
      .select("*")
      .where("email", email)
      .first();
    if (userLocal) {
      if (userLocal.is_linked_to_google == false) {
        await this.updateUserGoogleLinkage(email, true);
      }
      return true;
    } else {
      const randomPassword = this.generateWord();
      const createdUser = await this.createLocalUser(
        email,
        randomPassword,
        display_name,
        "NA",
        "NA"
      );
      if (createdUser.success) {
        await this.updateUserGoogleLinkage(email, true);
        return true;
      }
    }
    return false;
  }
  static async createGoogleUser(email, googleId) {
    const userExists = await knex(googleUser)
      .select("*")
      .where("email", email)
      .first();
    if (userExists) {
      return false;
    }
    const id = await knex(googleUser).insert([
      {
        email: email,
        google_id: googleId,
      },
    ]);
    if (id != null) {
      return true;
    }
    return false;
  }

  static generateWord() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let word = "";
    for (let i = 0; i < 10; i++) {
      word += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return word;
  }
  static async searchUser(display_name) {
    const user = await knex(localUser)
      .select("*")
      .where({ display_name: display_name })
      .first();
    if (!user) {
      throw Error("searched User Not found!");
    }
    return user;
  }
  static async setInterests() {}
}
module.exports = LocalUser;
