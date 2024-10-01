import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../products/productsApi";
import { useCreateReviewMutation } from "./reviewsApi";

function PostAReview({ isModalOpen, handleClose }) {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = useCreateReviewMutation();
  const handleRating = (value) => {
    setRating(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to post a review");
      return;
    }
    const data = {
      productId: id,
      userId: user?._id,
      rating,
      comment,
    };
    console.log(data);
    try {
      await postReview(data);
      alert("Comment posted successfully");
      setComment("");
      setRating(0);
      refetch();
      handleClose();
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };
  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Post A Review</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-500 text-xl"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i> // Changed "start" to "star"
              ) : (
                <i className="ri-star-line"></i> // Changed "start" to "star"
              )}
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none"
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostAReview;
