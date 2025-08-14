import { Star, User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Review({ clothId, reviews, setReviews }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Review handlers
  const handleStarClick = (rating) => {
    setReviewRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!auth) navigate("/login");

    if (reviewRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (reviewComment.trim().length < 3) {
      toast.error("Please write a review with at least 3 characters");
      return;
    }

    try {
      setIsSubmittingReview(true);
      const payload = {
        user: auth._id,
        product: clothId,
        rating: reviewRating,
        comment: reviewComment,
      };

      const res = await axios.post(`/reviews`, payload);
      setReviews((prev) => [...prev, res.data.data]);
      setReviewRating(0);
      setReviewComment("");
      setHoverRating(0);
      setShowReviewForm(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const resetReviewForm = () => {
    setReviewRating(0);
    setReviewComment("");
    setHoverRating(0);
    setShowReviewForm(false);
  };

  return (
    <div>
      {/* Write a Review Section */}
      <div className="mt-12 sm:mt-16 border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Customer Reviews ({reviews.length})
          </h2>
          {!showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-primary-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors duration-300 flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              Write a Review
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Write Your Review
            </h3>

            <div className="space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-colors duration-150"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || reviewRating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {reviewRating > 0
                      ? `${reviewRating} star${reviewRating > 1 ? "s" : ""}`
                      : "Select rating"}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    Minimum 3 characters required
                  </span>
                  <span className="text-xs text-gray-500">
                    {reviewComment.length}/500
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSubmitReview}
                  disabled={
                    isSubmittingReview ||
                    reviewRating === 0 ||
                    reviewComment.trim().length < 4
                  }
                  className="bg-primary-700 text-white border border-primary-700 px-6 py-2 rounded-lg font-medium hover:bg-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center gap-2"
                >
                  {isSubmittingReview ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>

                <button
                  onClick={resetReviewForm}
                  className="text-primary-700  bg-white border-2 border-primary-700 px-6 py-2 rounded-lg font-medium hover:bg-primary-700 hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center gap-2"
                >
                  Cancel Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Display */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {review.user.fullname}
                    </span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No reviews yet. Be the first to write a review!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;
