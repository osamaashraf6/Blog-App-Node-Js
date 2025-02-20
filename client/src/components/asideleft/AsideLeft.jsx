import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCartPlus,
  faComment,
  faHeart,
  faReceipt,

} from "@fortawesome/free-solid-svg-icons";
const AsideLeft = () => {
  return (
    <>
      <div class="altop bg-white mb-[5px] py-4 px-4">
        <ul class="flex flex-col gap-5">
          <li class="">
            <span class="font-medium text-xs">John Doe</span>
          </li>
          <li class="flex items-center gap-2">
            <a routerLink="/wishlist">
              <span class="font-medium text-xs">
                <FontAwesomeIcon icon={faHeart} /> My Wishlist
              </span>
            </a>
          </li>
          <li class="flex items-center gap-2">
            <a routerLink="/order">
              <span class="font-medium text-xs">
                <FontAwesomeIcon icon={faReceipt} /> My Orders
              </span>
            </a>
          </li>
          <li class="flex items-center gap-2">
            <a routerLink="/userreviews">
              <span class="font-medium text-xs">
                <FontAwesomeIcon icon={faComment} /> My Reviews
              </span>
            </a>
          </li>
          <li class="flex items-center gap-2">
            <a routerLink="/cart">
              <span class="font-medium text-xs">
                <FontAwesomeIcon icon={faCartPlus} /> My Cart
              </span>
            </a>
          </li>
        </ul>
      </div>
      {/* <!--  --> */}
      <div class="alcenter bg-white py-4 px-4 mb-[3px]">
        <h3 class="font-medium text-xs pb-4">Your Stories</h3>
        <ul class="flex flex-col gap-5">
          <li class="flex items-center gap-2">
            <div class="w-[28px] h-[28px]">
              <img
                src="/6.png"
                alt="user-profile"
                class="responsive-img rounded-full"
              />
            </div>
            <span class="font-medium text-xs">Events</span>
          </li>
          <li class="flex items-center gap-2">
            <div class="w-[28px] h-[28px]">
              <img
                src="/4.png"
                alt="user-profile"
                class="responsive-img rounded-full"
              />
            </div>
            <span class="font-medium text-xs">Gaming</span>
          </li>
          <li class="flex items-center gap-2">
            <div class="w-[28px] h-[28px]">
              <img
                src="/8.png"
                alt="user-profile"
                class="responsive-img rounded-full"
              />
            </div>
            <span class="font-medium text-xs">Gallery</span>
          </li>
          <li class="flex items-center gap-2">
            <div class="w-[28px] h-[28px]">
              <img
                src="/9.png"
                alt="user-profile"
                class="responsive-img rounded-full"
              />
            </div>
            <span class="font-medium text-xs">Videos</span>
          </li>
          <li class="flex items-center gap-2">
            <div class="w-[28px] h-[28px]">
              <img
                src="/10.png"
                alt="user-profile"
                class="responsive-img rounded-full"
              />
            </div>
            <span class="font-medium text-xs">Messages</span>
          </li>
        </ul>
      </div>
      {/* <!--  --> */}
      <div class="albottom bg-white py-4 px-4 h-full">
        <h3 class="font-medium text-xs pb-4">Others</h3>
        <ul class="flex flex-col gap-5">
          <li class="flex items-center gap-2">
            <div class="w-[28px] h-[28px]">
              <img
                src="/13.png"
                alt="user-profile"
                class="responsive-img rounded-full"
              />
            </div>
            <span class="font-medium text-xs">Fundraiser</span>
          </li>
          <li class="flex items-center gap-2">
            <div class="w-[28px] h-[28px]">
              <img
                src="/6.png"
                alt="user-profile"
                class="responsive-img rounded-full"
              />
            </div>
            <span class="font-medium text-xs">Tutorials</span>
          </li>
          <li class="flex items-center gap-2">
            <div class="w-[28px] h-[28px]">
              <img
                src="/12.png"
                alt="user-profile"
                class="responsive-img rounded-full"
              />
            </div>
            <span class="font-medium text-xs">Courses</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AsideLeft;
