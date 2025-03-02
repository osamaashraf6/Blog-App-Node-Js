import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./asideCenter.scss";
import { format } from "timeago.js";
import {
  faFacebook,
  faLinkedin,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import globalService from "../../services/globalService";
import Address from "../address/Address";
import useUserLogic from "../../hooks/shared/userLogic";
const AsideCenter = () => {
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const {
    handleChangePassword,
    handleUpdateUserProfile,
    registerPassword,
    handleSubmitPassword,
    watch,
    errorsPassword,
    errorsProfile,
    updateProLoading,
    changePassLoading,
    deleteProLoading,
    isPending,
    user,
    handleSubmitProfile,
    registerProfile,
  } = useUserLogic();
  return (
    <div className="mr-24">
      {/* <!-- coverimg --> */}
      <section className="cover_img mb-5">
        <div className="h-[30vh]">
          <img
            src="https://images.pexels.com/photos/1079783/pexels-photo-1079783.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="cover-img"
            className="img-responsive-fill"
          />
        </div>
      </section>

      {/* <!-- userinfo --> */}
      <section className="pb-16">
        {isPending ? (
          <p>Loading</p>
        ) : user?.data ? (
          <div
            key={user?.data?._id}
            className="px-6 pt-28 py-4 rounded-xl bg-white shadow-lg flex flex-col gap-5 relative mb-10"
          >
            <div className="absolute top-[-100px] left-[50%] translate-x-[-50%] text-center">
              <div className="w-[160px] h-[160px] rounded-full border-[6px] border-white mb-3 shadow-md">
                <img
                  src={`
                     ${
                       user?.data?.profileImg
                         ? globalService.userImg + user?.data?.profileImg
                         : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLNskLysx-bhYLWXuebdAbB4rjz9u8sNTkR4o4w484CkY8Fp0tdAfMbncOvg4I9eZMtpg&usqp=CAU"
                     }
                        `}
                  alt={user?.data?.name}
                  className="img-responsive-fill rounded-full"
                />
              </div>
              <h2 className="capitalize font-bold text-lg">
                {user?.data?.name} {user?.data?.lastname}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faX} />
                <FontAwesomeIcon icon={faLinkedin} />
                <FontAwesomeIcon icon={faPinterest} />
              </div>
              <div className="flex gap-4 text-gray-500">
                <div className="flex gap-1 items-center">
                  <i className="fas fa-map-marker-alt"></i>
                  <span className="">
                    {user?.data?.address[0]?.street} | {""}
                    {user?.data?.address[0]?.city} | {""}
                    {user?.data?.address[0]?.state} | {""}
                    {user?.data?.address[0]?.postalCode}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button>
                  <i className="fas fa-envelope"></i>
                  {user?.data?.email}
                </button>
                <div className="">+2{user?.data?.phone}</div>
              </div>
            </div>
            <button
              onClick={() => setOpenUpdateUser(true)}
              className="px-[18px] w-fit py-1 rounded border border-emerald-500 text-emerald-500 text-sm"
            >
              Update My Profile
            </button>
            <button
              onClick={() => setOpenChangePassword(true)}
              className="px-2 w-fit py-1 rounded bg-black text-white text-sm"
            >
              Change My Password
            </button>
            {user?.data?.passwordChangedAt && (
              <p>Password changedAt: {format(user?.data?.passwordChangedAt)}</p>
            )}
          </div>
        ) : (
          <p>No user Found</p>
        )}
      </section>

      {/* <!-- Modal User --> */}
      <div
        className={`
          ${openUpdateUser ? "flex" : "hidden"} 
           parmodal top-0 left-0 w-full h-full justify-center pt-[82px] bg-[#000000cc] z-50 fixed
        `}
      >
        <div className="parmodal_modal  overflow-y-scroll bg-white w-[600px] h-[486px] pr-4 pl-10 pt-2 pb-8">
          <div className="flex justify-end">
            <button
              onClick={() => setOpenUpdateUser(false)}
              className="p-1 text-white bg-red-500 text-xs"
            >
              close
            </button>
          </div>
          <h2 className="text-2xl text-gray-300 font-bold pb-6">
            Upade Your Profile
          </h2>
          <form
            onSubmit={handleSubmitProfile(handleUpdateUserProfile)}
            className="flex flex-col gap-4 pr-6"
          >
            <div className="imgs flex gap-11">
              <div className="">
                <h3 className="text-gray-500 text-sm font-medium pb-2">
                  profile picture
                </h3>
                <div className="border">
                  <label className="cursor-pointer" htmlFor="profile"></label>
                  <input
                    type="file"
                    accept="image/*"
                    id="profile"
                    name="profileImg"
                    {...registerProfile("profileImg")}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                {...registerProfile("name", {
                  minLength: {
                    value: 3,
                    message: "name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "name cannot exceed 20 characters",
                  },
                })}
                className="text-sm w-full border-0 border-b"
              />
            </div>
            {errorsProfile.name && (
              <p className="text-red-500">{errorsProfile.name.message}</p>
            )}
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                Phone
              </label>
              <input
                name="phone"
                {...registerProfile("phone")}
                type="text"
                className="text-sm w-full border-0 border-b"
              />
            </div>

            <button
              type="submit"
              className="p-1 bg-blue-500 text-white text-sm"
              disabled={updateProLoading}
            >
              {updateProLoading ? "Please wait" : "Update"}
            </button>
          </form>
        </div>
      </div>

      {/* <!-- change password --> */}
      <div
        className={`
          ${openChangePassword ? "flex" : "hidden"} 
           parmodal top-0 left-0 w-full h-full justify-center pt-[82px] bg-[#000000cc] z-50 fixed
        `}
      >
        <div className="parmodal_modal  bg-white w-[350px] h-[500px] pr-4 pl-10 pt-2 pb-8">
          <div className="flex justify-end">
            <button
              onClick={() => setOpenChangePassword(false)}
              className="p-1 text-white bg-red-500 text-xs"
            >
              close
            </button>
          </div>
          <h2 className="text-2xl text-gray-300 font-bold pb-6">
            Upade Your Profile
          </h2>
          <form
            onSubmit={handleSubmitPassword(handleChangePassword)}
            className="flex flex-col gap-4 pr-6"
          >
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                Old Password
              </label>
              <input
                type="password"
                className="text-sm w-full border-0 border-b"
                name="currentPassword"
                {...registerPassword("currentPassword", {
                  required: "currentPassword is required",
                  minLength: {
                    value: 6,
                    message: "currentPassword must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "currentPassword cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "currentPassword must contain at least one letter and one number",
                  },
                })}
              />
            </div>
            {errorsPassword.currentPassword && (
              <p className="text-red-500">
                {errorsPassword.currentPassword.message}
              </p>
            )}
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                New Password
              </label>
              <input
                type="password"
                className="text-sm w-full border-0 border-b"
                name="password"
                {...registerPassword("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
              />
            </div>
            {errorsPassword.password && (
              <p className="text-red-500">{errorsPassword.password.message}</p>
            )}
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="text-sm w-full border-0 border-b"
                name="confirmPassword"
                {...registerPassword("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
            </div>
            {errorsPassword.confirmPassword && (
              <p className="text-red-500">
                {errorsPassword.confirmPassword.message}
              </p>
            )}
            <button
              type="submit"
              className="p-1 bg-yellow-500 text-white text-sm"
              disabled={changePassLoading}
            >
              {changePassLoading ? "Please wait..." : "Change"}
            </button>
          </form>
        </div>
      </div>
      <Address />
    </div>
  );
};

export default AsideCenter;
