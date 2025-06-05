import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Link,
  Copy,
  Trash2,
  BarChart3,
  Plus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [login, setLogin] = useState(false);
  const [url, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [generateQR, setGenerateQR] = useState(false);
  const [zoomedQR, setZoomedQR] = useState(null);
  const navigate = useNavigate()



  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setLogin(true);
    getAllUrls();
  } else {
    setLogin(false);
  }
}, []);

  const handleLogin = () => {
    if(!login){
      navigate("/login");
      setLogin(true);
    }else{
      axios.post('https://url-shortner-kappa-lovat.vercel.app/auth/logout',{});
      localStorage.removeItem("token");
      setLogin(false);
    }
    window.location.reload(); 
  };

  const handleCreateUrl = async () => {
    try {
      const response = await axios.post("https://url-shortner-kappa-lovat.vercel.app/url/create", {
        url: newUrl,
      });

      if (generateQR) {
        await axios.post("https://url-shortner-kappa-lovat.vercel.app/generateQR/qr", {
          url: newUrl,
        });
      }

      // Refresh URLs after creation
      getAllUrls();
      setNewUrl("");
      setCustomAlias("");
      setShowCreateForm(false);
      setGenerateQR(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getAllUrls = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found. User might not be logged in.");
        return;
      }
      const response = await axios.get("https://url-shortner-kappa-lovat.vercel.app/url/getallurls", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUrls(response.data.urls);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteUrl = (id) => {
  };

  const handleQRClick = (qrLink) => {
    setZoomedQR(qrLink);
  };

  const closeQRModal = () => {
    setZoomedQR(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
                <Link className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  URL Shortener
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Manage your shortened links
                </p>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-red-200 outline-none"
            >
              {!login ? "Login" : "Logout"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Create URL */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Short URL</h2>
            {!showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
              >
                <Plus className="w-5 h-5 inline" /> New Link
              </button>
            )}
          </div>

          {showCreateForm && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original URL</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Alias (Optional)</label>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-custom-link"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={generateQR}
                    onChange={(e) => setGenerateQR(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Generate QR Code</span>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleCreateUrl}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                >
                  Create Short URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setGenerateQR(false);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* URLs Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
          <div className="p-10 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Links</h2>
            <p className="text-gray-600">Manage and track your shortened URLs</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase">Original URL</th>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase">Short URL</th>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase">QR Code</th>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase">Clicks</th>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-100">
                {url.map((url) => (
                  <tr key={url._id} className="hover:bg-blue-50/50 transition-all duration-200">
                    <td className="px-10 py-8 whitespace-nowrap text-sm text-gray-900 font-semibold max-w-xs truncate">
                      {url.full_urls}
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">
                          {`https://url-shortner-three-drab.vercel.app/url/${url.short_urls}`}
                        </span>
                        <button
                          onClick={() => copyToClipboard(`https://url-shortner-three-drab.vercel.app/url/${url.short_urls}`)}
                          className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap text-center">
                      {url.qrLink ? (
                        <img
                          src={url.qrLink}
                          alt="QR"
                          className="w-100 h-10 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 hover:scale-105 transform"
                          onClick={() => handleQRClick(url.qrLink)}
                        />
                      ) : (
                        <span className="text-sm text-gray-400">No QR</span>
                      )}
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <BarChart3 className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-900 font-bold">
                          {url.clicks}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => deleteUrl(url._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {zoomedQR && (
        <div 
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={closeQRModal}
        >
          <div className="relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <button
              onClick={closeQRModal}
              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">QR Code</h3>
              <img
                src={zoomedQR}
                alt="QR Code"
                className="w-64 h-64 mx-auto border-2 border-gray-200 rounded-xl shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="text-sm text-gray-500 mt-4">
                Scan this QR code to access the shortened URL
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;