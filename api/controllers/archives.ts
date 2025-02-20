// 1. All required import

import { IArchive } from "../interfaces/Archive";
import Archive from "../models/Archive";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
} from "./refactorcrud";

// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.
// 3.1 general

// createOneLike
export const createOneArchive = createOneHandler<IArchive>(Archive);
// getAllArchive
export const getAllArchive = getAllHandler<IArchive>(Archive, "ArchiveModel");

// getOneArchive: There is no something called getOneArchive not logical

// updateOneArchive: There is no something called updateOneArchive or updateWishlist not logical just there is deleteArchive or deleteProduct From Wishlist

// deleteOneArchive
export const deleteOneArchive = deleteOneHandler<IArchive>(Archive);

// 3.2 private

// 3.3 custom
