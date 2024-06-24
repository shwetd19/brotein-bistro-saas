import { useState } from "react";
import Sidebar from "../components/Sidebar";
const Add = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2">
      <Sidebar />
      <div className="pt-20 p-2 w-full">
        <div className="p-6 rounded-xl border shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Upload Your Ads Here</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto mb-4 rounded"
            />
          )}
          {image && (
            <div>
              <p className="text-sm text-gray-500">
                Selected file: {image.name}
              </p>
            </div>
          )}
          <button>Upload Add</button>
        </div>
      </div>
    </div>
  );
};

export default Add;
