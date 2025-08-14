"use client"
import { Link } from "react-router-dom"
import { Package, Heart, User, CreditCard, MapPin, Bell } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { mockOrders } from "../../utils/mockData"

const UserDashboard = () => {
  const { user } = useAuth()

  const recentOrders = mockOrders.slice(0, 3)

  const stats = [
    { label: "Total Orders", value: "12", icon: Package, color: "bg-blue-500" },
    { label: "Wishlist Items", value: "8", icon: Heart, color: "bg-red-500" },
    { label: "Reward Points", value: "1,250", icon: CreditCard, color: "bg-green-500" },
    { label: "Saved Addresses", value: "3", icon: MapPin, color: "bg-purple-500" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Manage your account and track your orders</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={stat.label} className="card p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                <Link to="/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <p className="text-sm text-gray-600">{order.items.length} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No orders yet</p>
                  <Link to="/products" className="btn-primary mt-4">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <button className="w-full btn-outline">Edit Profile</button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/orders"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">View Orders</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Wishlist</span>
                </Link>
                <Link
                  to="/addresses"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Addresses</span>
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Notifications</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
