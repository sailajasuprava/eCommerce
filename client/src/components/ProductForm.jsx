import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { useState } from "react";
import { useCloth } from "../context/ClothContext";
import {
  sizes,
  categories,
  fits,
  neckTypes,
  occasions,
  patterns,
  sleeveTypes,
} from "../utils/mockData";

function ClothForm({ cloth, onClose }) {
  const [formData, setFormData] = useState(
    cloth || {
      prodname: "",
      description: "",
      fabric: "",
      category: "",
      fit: "",
      occasion: "",
      sleeveType: "",
      neckType: "",
      pattern: "",
      price: "",
      discountPercent: "",
      variants: [
        {
          color: "",
          sizes: [{ size: "", stock: 0 }],
        },
      ],
      images: [],
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState(cloth?.images || []);
  const { setClothes } = useCloth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleVariantChange = (index, field, value) => {
  //   const updatedVariants = [...formData.variants];
  //   updatedVariants[index][field] = value;
  //   setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  // };

  // const addVariant = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     variants: [...prev.variants, { color: "", size: "M", stock: 0 }],
  //   }));
  // };

  // const removeVariant = (index) => {
  //   const updated = [...formData.variants];
  //   updated.splice(index, 1);
  //   setFormData((prev) => ({ ...prev, variants: updated }));
  // };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);

    setFormData({
      ...formData,
      image: newPreviewUrls[0] || "",
      images: newPreviewUrls,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setIsLoading(true);
      if (cloth) {
        const res = await axios.patch(`/clothes/${cloth._id}`, formData);
        // Update the specific cloth in the array
        setClothes((prev) =>
          prev.map((p) => (p._id === cloth._id ? res.data.data : p))
        );
        toast.success(res.data.message);
      } else {
        const res = await axios.post("/clothes", formData);
        setClothes((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
      }

      setFormData({
        prodname: "",
        description: "",
        fabric: "",
        category: "",
        fit: "",
        occasion: "",
        sleeveType: "",
        neckType: "",
        pattern: "",
        price: "",
        discountPercent: "",
        variants: [{ color: "", size: "", stock: 0 }],
        images: [],
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
    onClose();
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { color: "", sizes: [] }],
    });
  };

  const removeVariant = (index) => {
    const updated = [...formData.variants];
    updated.splice(index, 1);
    setFormData({ ...formData, variants: updated });
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...formData.variants];
    updated[index][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  const addSize = (variantIndex) => {
    const updated = [...formData.variants];
    updated[variantIndex].sizes.push({ size: "", stock: 0 });
    setFormData({ ...formData, variants: updated });
  };

  const removeSize = (variantIndex, sizeIndex) => {
    const updated = [...formData.variants];
    updated[variantIndex].sizes.splice(sizeIndex, 1);
    setFormData({ ...formData, variants: updated });
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const updated = [...formData.variants];
    updated[variantIndex].sizes[sizeIndex][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {cloth ? `Edit Cloth` : `Add New  Cloth`}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cloth Name */}
            <div>
              <label>Cloth Name</label>
              <input
                name="prodname"
                type="text"
                required
                value={formData.prodname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label>Fabric</label>
              <input
                name="fabric"
                type="text"
                required
                value={formData.fabric}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Fit</label>
              <select
                name="fit"
                value={formData.fit}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select</option>
                {fits.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Occasion</label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select</option>
                {occasions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Pattern</label>
              <select
                name="pattern"
                value={formData.pattern}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select</option>
                {patterns.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Neck Style</label>
              <select
                name="neckType"
                value={formData.neckType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select</option>
                {neckTypes.map((neck) => (
                  <option key={neck} value={neck}>
                    {neck}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Sleeve Type</label>
              <select
                name="sleeveType"
                value={formData.sleeveType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select</option>
                {sleeveTypes.map((design) => (
                  <option key={design} value={design}>
                    {design}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Price</label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label>discount percent</label>
              <input
                name="discountPercent"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label>Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {previewUrls.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* <div className="bg-gray-50 p-2 rounded-lg border">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">
              Variants
            </h3>
            {formData?.variants?.map((variant, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 mb-3 items-center"
              >
                <input
                  placeholder="Color"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                  className="input"
                  required
                />
                <select
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  className="input"
                  required
                >
                  <option value="">Size</option>
                  {sizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", +e.target.value)
                  }
                  placeholder="Stock"
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              + Add Variant
            </button>
          </div> */}

          <div className="bg-gray-50 p-2 rounded-lg border">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">
              Variants
            </h3>

            {formData?.variants?.map((variant, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <div className="flex gap-4 items-center mb-2">
                  <input
                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                    className="input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
                  >
                    Remove Color
                  </button>
                </div>

                {/* Sizes under this color */}
                {variant?.sizes?.map((sizeEntry, sizeIndex) => (
                  <div key={sizeIndex} className="flex gap-4 mb-2 items-center">
                    <select
                      value={sizeEntry.size}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          sizeIndex,
                          "size",
                          e.target.value
                        )
                      }
                      className="input"
                      required
                    >
                      <option value="">Size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={sizeEntry.stock}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          sizeIndex,
                          "stock",
                          +e.target.value
                        )
                      }
                      placeholder="Stock"
                      className="input"
                    />
                    <button
                      type="button"
                      onClick={() => removeSize(index, sizeIndex)}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
                    >
                      Remove Size
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addSize(index)}
                  className="text-sm px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-md"
                >
                  + Add Size
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addVariant}
              className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              + Add Variant
            </button>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              {cloth ? "Update" : "Add"} Cloth
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClothForm;
