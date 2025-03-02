// 1. All required import

import { ISaved } from "../interfaces/Saved";
import Saved from "../models/Saved";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
} from "./refactorcrud";

// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.
// 3.1 general

// createOneSaved
export const createOneSaved = createOneHandler<ISaved>(Saved);
// getAllSaved
export const getAllSaved = getAllHandler<ISaved>(Saved, "SavedModel");

// getOneSaved: There is no something called getOneSaved not logical

// updateOneSaved: There is no something called updateOneSaved or updateWishlist not logical just there is deleteSaved or deleteProduct From Wishlist

// deleteOneSaved
export const deleteOneSaved = deleteOneHandler<ISaved>(Saved);

// 3.2 private

// 3.3 custom
