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
  const [adImage, setAdImage] = useState(null);
  const [adPreview, setAdPreview] = useState(null);
  const [eventImage, setEventImage] = useState(null);
  const [eventPreview, setEventPreview] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);
  const [events, setEvents] = useState([]); // State for storing fetched events

  useEffect(() => {
    fetchAdvertisements();
    fetchEvents(); // Fetch events on component mount
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

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events/getAllevents"); // Adjust the endpoint as needed
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "ad") {
          setAdImage(file);
          setAdPreview(reader.result);
        } else {
          setEventImage(file);
          setEventPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (type === "ad") {
        setAdImage(null);
        setAdPreview(null);
      } else {
        setEventImage(null);
        setEventPreview(null);
      }
    }
  };

  const handleSubmit = async (type) => {
    setIsLoading(true);
    try {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        `/${type === "ad" ? "ads" : "events"}/${
          type === "ad" ? adImage.name : eventImage.name
        }`
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        type === "ad" ? adImage : eventImage
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress indicator can be added here
        },
        (error) => {
          console.error("Upload failed:", error);
          setIsLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const body =
            type === "ad"
              ? { imageUrl: downloadURL, addText: "Ad Text" }
              : {
                  eventPoster: downloadURL,
                  eventName,
                  eventDate,
                  eventLocation,
                };

          const response = await fetch(
            `/api/${
              type === "ad" ? "ads/advertisements" : "events/createevent"
            }`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          if (response.ok) {
            setIsSuccess(true);
            type === "ad" ? fetchAdvertisements() : fetchEvents();
          } else {
            console.error("Failed to upload:", await response.text());
          }

          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error("Error during submit:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      const response = await fetch(
        `/api/${type === "ad" ? "ads/advertisements" : "events/events"}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        type === "ad" ? fetchAdvertisements() : fetchEvents();
      } else {
        console.error("Failed to delete:", await response.text());
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col md:col-span-2 lg:col-span-2 border rounded-xl backdrop-blur-2xl">
      <SideBarAdmin />
      <div className="pt-20 p-2 w-full">
        {/* Upload Your Ads Here */}
        <div className="p-6 rounded-xl border shadow-md w-full max-w-md m-2">
          <h2 className="text-2xl font-bold mb-4">Upload Your Ads Here</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "ad")}
            className="mb-4"
          />
          {adPreview && (
            <img
              src={adPreview}
              alt="Preview"
              className="w-full h-auto mb-4 rounded"
            />
          )}
          {adImage && (
            <div>
              <p className="text-sm text-gray-500">
                Selected file: {adImage.name}
              </p>
            </div>
          )}
          <button
            className="button"
            onClick={() => handleSubmit("ad")}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload Ad"}
          </button>
          {isSuccess && <p className="text-green-600 mt-2">Ad Uploaded!</p>}
        </div>

        {/* Upload Your Event Poster Here */}
        <div className="p-6 rounded-xl border shadow-md w-full max-w-md m-2">
          <h2 className="text-2xl font-bold mb-4">
            Upload Your Event Poster Here
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "event")}
            className="mb-4"
          />
          {eventPreview && (
            <img
              src={eventPreview}
              alt="Preview"
              className="w-full h-auto mb-4 rounded"
            />
          )}
          {eventImage && (
            <div>
              <p className="text-sm text-gray-500">
                Selected file: {eventImage.name}
              </p>
            </div>
          )}
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Event Name"
            className="my-4 border rounded-md p-2 w-full"
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="my-4 border rounded-md p-2 w-full"
          />
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            placeholder="Event Location"
            className="my-4 border rounded-md p-2 w-full"
          />
          <button
            className="button m-2"
            onClick={() => handleSubmit("event")}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload Event"}
          </button>
          {isSuccess && <p className="text-green-600 mt-2">Event Uploaded!</p>}
        </div>
      </div>
      <div className="mt-8 m-2">
        <h3 className="text-lg font-semibold mb-4">Previously Uploaded Ads</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advertisements.map((ad) => (
            <div
              key={ad._id}
              className="border p-4 rounded overflow-hidden shadow-md"
            >
              <img
                src={ad.imageUrl}
                alt="Ad"
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <p>{ad.addText}</p>
              <button
                className="button"
                onClick={() => handleDelete(ad._id, "ad")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 m-2">
        <h3 className="text-lg font-semibold mb-4">
          Previously Uploaded Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="border p-4 rounded overflow-hidden shadow-md"
            >
              <img
                src={event.eventPoster}
                alt="Event"
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <p className="font-semibold">{event.eventName}</p>
              <p>{new Date(event.eventDate).toLocaleDateString()}</p>
              <p>{event.eventLocation}</p>
              <button
                className="button"
                onClick={() => handleDelete(event._id, "event")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Add;
