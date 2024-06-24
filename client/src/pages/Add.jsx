import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import SideBarAdmin from "../components/SideBarAdmin";

const Add = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [addText, setAddText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [advertisements, setAdvertisements] = useState([]); // State to hold fetched advertisements

  useEffect(() => {
    fetchAdvertisements(); // Fetch advertisements on component mount
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch("/api/ads/advertisements");
      const data = await response.json();
      setAdvertisements(data);
    } catch (error) {
      console.error("Failed to fetch advertisements:", error);
    }
  };

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

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Upload failed", error);
        setIsLoading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const formData = {
            imageUrl: downloadURL,
            addText: addText,
          };

          const response = await fetch("/api/ads/advertisements", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            const message = `An error has occurred: ${response.status} ${response.statusText}`;
            const errorBody = await response.text();
            console.error("Response error body:", errorBody);
            throw new Error(message);
          }

          const result = await response.json();
          if (!result.success) throw new Error(result.message);

          console.log("Data submitted successfully");
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 3000);
          fetchAdvertisements(); // Refresh advertisements list after successful submission
        } catch (error) {
          console.error("Failed to submit data:", error.message);
        } finally {
          setIsLoading(false);
        }
      }
    );
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/ads/advertisements/${id}`, {
        method: "DELETE",
      });
      fetchAdvertisements(); // Refresh advertisements list after deletion
    } catch (error) {
      console.error("Failed to delete advertisement:", error);
    }
  };

  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2">
      <SideBarAdmin />
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
          <textarea
            value={addText}
            onChange={(e) => setAddText(e.target.value)}
            placeholder="Add Text"
            className="mb-4"
          />
          <button onClick={handleImageUpload} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Ad"}
          </button>
          {isSuccess && <p className="text-green-600 mt-2">Add Uploaded!</p>}
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Previously Uploaded Ads
          </h3>
          <ul>
            {advertisements.map((ad) => (
              <li key={ad._id} className="border p-4 mb-4">
                <img
                  src={ad.imageUrl}
                  alt="Ad"
                  className="w-full h-auto mb-4 rounded"
                />
                <p>{ad.addText}</p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(ad._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Add;
