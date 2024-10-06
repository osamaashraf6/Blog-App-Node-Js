import React from "react";

const NoPage = () => {
  return (
    <>
      <h1 className="nopage-heading">OOoops! Page Not Found</h1>
      <section className="no-page">
        <div className="no-page-responsive">
          <img
            src="https://png.pngtree.com/png-vector/20210702/ourmid/pngtree-error-404-page-not-found-website-png-image_3545448.jpg"
            alt="nopage"
            className="responsive"
          />
        </div>
      </section>
    </>
  );
};

export default NoPage;
