"use client"

import { useState } from "react"
import { Package, Eye, Download, RefreshCw } from "lucide-react"
import { mockOrders } from "../../utils/mockData"

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map((order, index) => (
            <div key={order.id} className="card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Package className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-gray-600">Placed on {order.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src="/placeholder.svg?height=60&width=60"
                          alt={item.name}
                          className="w-15 h-15 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setSelectedOrder(order)} className="btn-outline flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="btn-outline flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                    {order.status === "Delivered" && (
                      <button className="btn-outline flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <a href="/products" className="btn-primary">
            Start Shopping
          </a>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Order Details - #{selectedOrder.id}</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Order Date:</span>
                      <p className="font-medium">{selectedOrder.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <p
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}
                      >
                        {selectedOrder.status}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <p className="font-medium">${selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Items Ordered</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src="/placeholder.svg?height=50&width=50"
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderHistory
