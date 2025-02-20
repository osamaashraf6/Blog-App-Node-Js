import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Writee.scss";
import { useForm } from "react-hook-form";
import usePost from "../../hooks/postsHook";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { radioInputs } from "../../utils/data";
import { useLocation } from "react-router-dom";

const Writee = () => {
  const [quillValue, setQuillValue] = useState("");
  const [quillValidate, setQuillValidate] = useState(false);
  // const [draftForm, setDraftForm] = useState([]);
  // const [drafted, setDrafted] = useState(false);
  const location = useLocation();
  console.log(location.state);
  const { createOnePostMutation, updateOnePostMutation } = usePost();
  const { error, isPending, data } = createOnePostMutation;
  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubmitMethod = (data) => {
    if (!currentUser) {
      toast.error("Sign in first ! Save as draft for the next time");
    } else {
      // if (location?.state?.updated) {
      //   console.log(" updated");
      //   // Create FormData to send as multipart/form-data
      //   const formData = new FormData();
      //   formData.append("title", data.title);
      //   formData.append("briefDesc", data.briefDesc);
      //   formData.append("detailedDesc", quillValue);
      //   formData.append("category", data.category);
      //   if (data.postImg && data.postImg[0]) {
      //     formData.append("postImg", data.postImg[0]);
      //   }
      //   updateOnePostMutation.mutate(
      //     { id: location?.state?.updatedPost?._id, dataForm: formData },
      //     {
      //       onSuccess: () => {
      //         toast.success("Post Has Been Updated Successfully !");
      //       },
      //       onError: (res) => {
      //         toast.error(
      //           `${res?.response?.data?.error?.message}, Sign in Please !`
      //         );
      //       },
      //     }
      //   );
      //   reset();
      //   setQuillValue("");
      // } else {
      //   console.log(" posted  ");

      if (quillValue === "") {
        // ! it is not work not change the quillvalidate value, so the error not appeared
        setQuillValidate(true);
      }

      // Create FormData to send as multipart/form-data
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("briefDesc", data.briefDesc);
      formData.append("detailedDesc", quillValue);
      formData.append("category", data.category);
      if (data.postImg && data.postImg[0]) {
        formData.append("postImg", data.postImg[0]);
      }
      createOnePostMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Post Has Been Created Successfully !");
        },
        onError: (res) => {
          toast.error(
            `${res?.response?.data?.error?.message}, Sign in Please !`
          );
        },
      });
      reset();
      setQuillValue("");
    }
    // }
  };
  // const handleSaveAsDraft = () => {
  //   if (
  //     !getValues("title") &&
  //     !getValues("briefDesc") &&
  //     !quillValue &&
  //     !getValues("category")
  //   ) {
  //     toast.error("Write some thing at any input to save it as draft !");
  //   } else {
  //     localStorage.setItem(
  //       "postDraft",
  //       JSON.stringify({
  //         title: getValues("title"),
  //         briefDesc: getValues("briefDesc"),
  //         quillValue,
  //         category: getValues("category"),
  //       })
  //     );
  //     setDrafted(true);
  //     toast.success("Draft saved!");
  //   }
  // };
  // useEffect(() => {
  //   const parsedDraftForm = JSON.parse(localStorage.getItem("postDraft"));
  //   setDraftForm(parsedDraftForm);
  // }, []);
  return (
    <>
      <Navbar />
      <section className="write" id="write">
        <div className="container">
          {/*  */}
          <form
            className="edit-tools"
            onSubmit={handleSubmit(handleSubmitMethod)}
          >
            <div className="edit">
              <div>
                <input
                  type="text"
                  placeholder="Title..."
                  name="title"
                  // value={
                  //   location?.state?.updatedPost?.title
                  //     ? location?.state?.updatedPost?.title
                  //     : draftForm?.title
                  // }
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 6,
                      message: "Title must be at least 6 characters",
                    },
                  })}
                />
              </div>
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}

              <div>
                <input
                  type="text"
                  placeholder="briefDesc..."
                  name="briefDesc"
                  // value={
                  //   location?.state?.updatedPost?.briefDesc
                  //     ? location?.state?.updatedPost?.briefDesc
                  //     : draftForm?.briefDesc
                  // }
                  {...register("briefDesc", {
                    required: "briefDesc is required",
                    minLength: {
                      value: 6,
                      message: "briefDesc must be at least 6 characters",
                    },
                  })}
                />
              </div>
              {errors.briefDesc && (
                <p className="text-red-500">{errors.briefDesc.message}</p>
              )}

              <div className="reactquil">
                {/* // !  issue */}
                <ReactQuill
                  theme="snow"
                  // value={
                  //   location?.state?.updatedPost?.detailedDesc
                  //     ? location?.state?.updatedPost?.detailedDesc
                  //     : draftForm?.quillValue
                  // }
                  value={quillValue}
                  onChange={setQuillValue}
                />
              </div>
              {quillValidate && (
                <p className="text-red-500">Detailed Desc is required ! </p>
              )}
            </div>
            <div className="edit">
              <div className="publish-box">
                <h2>Publish</h2>
                <p>
                  {/* <span>Status:</span> {drafted ? "Drafted" : "Not Drafted"} */}
                </p>
                <p>
                  <span>Visibility:</span> Public
                </p>
                {/*  */}
                <div>
                  <input
                    type="file"
                    name="postImg"
                    {...register("postImg", {
                      required: "postImg is required",
                    })}
                  />
                </div>
                {errors.postImg && (
                  <p className="text-red-500">{errors.postImg.message}</p>
                )}

                {/*  */}
                <div className="btns">
                  {/* <span onClick={handleSaveAsDraft}>Save as a draft</span> */}
                  <span  >Save as a draft</span>
                  <button type="submit" disabled={isPending}>
                    {isPending ? "Please wait..." : "Publish"}
                  </button>
                </div>
              </div>
              <div className="category-box">
                <h2 className="pb-3">Category</h2>
                {/*  */}
                {radioInputs?.map((item) => (
                  <div key={item.id}>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="category"
                        // value={
                        //   location?.state?.updatedPost?.category
                        // ? location?.state?.updatedPost?.category
                        //     : draftForm?.category
                        //     ? draftForm?.category
                        //     : item.label
                        // }
                        // checked={
                        //   location?.state?.updatedPost?.category
                        //     ? location?.state?.updatedPost?.category ===
                        //       item.label
                        //     : draftForm?.category === item.label
                        // }
                        value={item.label}
                        //! important
                        id={item.label}
                        {...register("category", {
                          required: "category is required",
                        })}
                      />
                      <label htmlFor={item.label} className=" capitalize">
                        {item.label}
                      </label>
                    </div>
                  </div>
                ))}
                {errors.category && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Writee;
