import React, { useState } from "react";
import Cookies from 'js-cookie';
import {
  Link,
  Copy,
  Trash2,
  Edit3,
  BarChart3,
  Plus,
  QrCode,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const [login, setLogin] = useState(false);
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState();
  const [customAlias, setCustomAlias] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [generateQR, setGenerateQR] = useState(false);
  const navigate = useNavigate();
  const userId = Cookies.get('jwt');

  const handleLogin = () => {
    navigate("/login");
    setLogin(!login)
  };

  useEffect(() => {
    getAllUrls();
    console.log(("Triggered"));
    
  }, [userId]);

  const handleCreateUrl = async () => {
    try {
      console.log("ID",userId);
      
      const response = await axios.post("http://localhost:3000/url/create", {
        url: newUrl,
      });

      if (generateQR) {
        const responses = await axios.post(
          "http://localhost:3000/generateQR/qr",
          { url: newUrl }
        );
        console.log("Resp", responses.data.qr);
      }
      console.log("Response", response.data.short_url);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteUrl = (id) => {};

  const getAllUrls = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:3000/url/getallurls",
        {params:{userId}}
      );
      console.log("Respo", resp.data);
      setUrls(resp.data);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
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
              {login ? "Login" : "Logout"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Create New URL Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Short URL
            </h2>
            {!showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Link</span>
              </button>
            )}
          </div>

          {showCreateForm && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original URL
                </label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com/your-long-url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Alias (Optional)
                </label>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-custom-link"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors placeholder-gray-400"
                />
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={generateQR}
                    onChange={(e) => setGenerateQR(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Generate QR Code
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-7">
                  Check this if you want to generate a QR code for this URL
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleCreateUrl}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
                >
                  Create Short URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setGenerateQR(false);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* URLs List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
          <div className="p-10 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Your Links
            </h2>
            <p className="text-gray-600">
              Manage and track your shortened URLs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Original URL
                  </th>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Short URL
                  </th>
                  {urls.some((url) => url.hasQR) && (
                    <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      QR Code
                    </th>
                  )}
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-10 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-100">
                {urls.map((url) => (
                  <tr
                    key={url.id}
                    className="hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <td className="px-10 py-8 whitespace-nowrap">
                      <div className="text-sm text-gray-900 max-w-xs truncate font-semibold">
                        {url.originalUrl}
                      </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">
                          {url.shortUrl}
                        </span>
                        <button
                          onClick={() => copyToClipboard(url.shortUrl)}
                          className="text-gray-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-blue-50"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    {urls.some((u) => u.hasQR) && (
                      <td className="px-10 py-8 whitespace-nowrap">
                        {url.hasQR ? (
                          <div className="flex items-center justify-center">
                            <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                              {/* Replace this div with actual QR code component when you have the library */}
                              <div className="text-center text-gray-400">
                                <QrCode className="w-8 h-8 mx-auto" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 text-sm">
                            No QR
                          </div>
                        )}
                      </td>
                    )}
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
                    <td className="px-10 py-8 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {url.createdAt}
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-4">
                        <button className="text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-blue-50">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteUrl(url.id)}
                          className="text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-red-50"
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
