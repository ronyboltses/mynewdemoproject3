import React, { useState, useCallback } from 'react';
import { useAdminStore } from '../store/adminStore';
import { Building2, Calculator, Settings, FileText, Plus, Trash2, Upload } from 'lucide-react';
import ResourceUpload from './ResourceUpload';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const { settings, updateSettings, addResource, removeResource } = useAdminStore();
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: '',
    type: 'pdf' as const,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = useCallback((file: File) => {
    setSelectedFile(file);
  }, []);

  const handleAddResource = () => {
    if (newResource.title && selectedFile) {
      // Create a blob URL for the file
      const url = URL.createObjectURL(selectedFile);
      
      addResource({
        ...newResource,
        url,
      });
      
      setNewResource({
        title: '',
        description: '',
        category: '',
        type: 'pdf',
      });
      setSelectedFile(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Site Branding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Site Branding</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => updateSettings({ siteName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Color
            </label>
            <div className="flex space-x-4">
              <input
                type="color"
                value={settings.brandColor}
                onChange={(e) => updateSettings({ brandColor: e.target.value })}
                className="h-10 w-20 px-1 py-1 border rounded-lg"
              />
              <input
                type="text"
                value={settings.brandColor}
                onChange={(e) => updateSettings({ brandColor: e.target.value })}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Upload
            </label>
            <div className="flex items-center space-x-4">
              {settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  alt="Site Logo"
                  className="w-12 h-12 object-contain"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Header
            </label>
            <input
              type="text"
              value={settings.reportHeader}
              onChange={(e) => updateSettings({ reportHeader: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Resources Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Resources Management</h2>
        </div>

        <div className="space-y-6">
          {/* Add New Resource */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Resource</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter resource title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newResource.category}
                  onChange={(e) =>
                    setNewResource({ ...newResource, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Checklists, Formulas, Guidelines"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newResource.description}
                  onChange={(e) =>
                    setNewResource({ ...newResource, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter resource description"
                />
              </div>
            </div>

            <ResourceUpload onUpload={handleFileUpload} />

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddResource}
                disabled={!newResource.title || !selectedFile}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                <Plus className="w-4 h-4" />
                <span>Add Resource</span>
              </button>
            </div>
          </div>

          {/* Current Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Resources</h3>
            <div className="space-y-4">
              {settings.resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <p className="text-xs text-gray-500">
                      Category: {resource.category}
                    </p>
                  </div>
                  <button
                    onClick={() => removeResource(resource.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}

              {settings.resources.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No resources added yet
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}