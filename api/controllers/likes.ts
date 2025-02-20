// 1. All required import

import { ILike } from "../interfaces/Like";
import Like from "../models/Like";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from "./refactorcrud";

// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.
// 3.1 general

// createOneLike
export const createOneLike = createOneHandler<ILike>(Like);
// getAllLike
export const getAllLike = getAllHandler<ILike>(Like, "LikeModel");

// getOneLike: There is no something called getOneLike not logical

// updateOneLike: There is no something called updateOneLike or updateWishlist not logical just there is deleteLike or deleteProduct From Wishlist

// deleteOneLike
export const deleteOneLike = deleteOneHandler<ILike>(Like);

// 3.2 private

// 3.3 custom
