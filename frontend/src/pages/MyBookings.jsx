import { useEffect, useState } from "react";
import api from "../services/api";
import { getToken } from "../utils/auth";
import Loader from "../components/Loader";

export default function MyBookings() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    if (!token) return;
    api
      .get("/slots/my-bookings", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [token]);

  if (!token) return <p className="text-center mt-10">Please login to see your bookings.</p>;
  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {slots.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">No bookings yet</p>
      ) : (
        slots.map(slot => (
          <div
            key={slot._id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold mb-4">{slot.time}</h3>
            <p className="text-green-600 font-semibold">Booked</p>
          </div>
        ))
      )}
    </div>
  );
}
