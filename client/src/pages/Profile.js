import React from "react";
import AsideLeft from "../components/asideleft/AsideLeft";
import AsideCenter from "../components/asidecenter/AsideCenter";
import Navbar from "../components/navbar/Navbar";
const Profile = () => {
  return (
    <>
      <Navbar />
      <main class="">
        <section class="big_section" id="big_section">
          <div class="asides flex">
            <div class="aside_left pt-16 w-[19%] fixed h-full z-10 overflow-y-auto">
              <AsideLeft />
            </div>
            <div class="aside pt-16 w-[60%] ml-[30%]">
              <AsideCenter />
            </div>
          </div>
        </section>
      </main>
     
    </>
  );
};

export default Profile;
