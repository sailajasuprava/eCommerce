import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import ClothForm from "../../components/ProductForm";
import Spinner from "../../components/Spinner";
import { useCloth } from "../../context/ClothContext";
import { useAuth } from "../../context/AuthContext";
import PageNotFound from "../../components/PageNotFound";

export const categories = ["men", "women", "kids", "unisex"];

const AdminProducts = () => {
  const { clothes, setClothes, isLoading } = useCloth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddClothModalOpen, setIsAddClothModalOpen] = useState(false);
  const [editingCloth, setEditingCloth] = useState(null);
  const { isAdmin } = useAuth();

  const filteredCloths = clothes.filter((cloth) => {
    const matchesSearch = cloth?.prodname
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || cloth.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (clothId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setClothes(clothes.filter((cloth) => cloth.id !== clothId));
    }
  };

  const handleEditProduct = (cloth) => {
    setEditingCloth(cloth);
    setIsAddClothModalOpen(true);
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      {!isAdmin ? (
        <PageNotFound />
      ) : (
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8 py-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Product Management
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage your product catalog
              </p>
            </div>

            <button
              onClick={() => {
                setIsAddClothModalOpen(true);
                setEditingCloth(null);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Cloth
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search clothes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Clothes Table */}
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fabric
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Occasion
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCloths.map((cloth, index) => (
                  <tr
                    key={cloth._id}
                    className="hover:bg-gray-50 animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={
                            cloth.image ||
                            "https://dummyimage.com/400x400/ccc/000&text=Embroidered+Party+Top"
                          }
                          alt={cloth.prodname}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {cloth.prodname}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {cloth._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {cloth.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cloth.fabric}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {cloth.occasion}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{cloth.price}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cloth.fit}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(cloth)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(cloth._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add/Edit Cloth Modal */}
          {(isAddClothModalOpen || editingCloth) && (
            <ClothForm
              cloth={editingCloth}
              onClose={() => {
                setIsAddClothModalOpen(false);
                setEditingCloth(null);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
