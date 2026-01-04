import api from "../services/api";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function SlotCard({ slot }) {
  const navigate = useNavigate();
  const token = getToken();

  const book = async () => {
    if (!token) {
      alert("Please login to book a slot");
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    if (slot.booked) return;

    try {
      await api.post(`/slots/book/${slot._id}`);
      window.location.reload(); // Reload to update booked slot
    } catch (err) {
      console.log(err);
      alert("Booking failed, try again!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition cursor-pointer">
      <h3 className="text-xl font-semibold mb-4">{slot.time}</h3>
      <button
        onClick={book}
        disabled={slot.booked}
        className={`py-2 rounded-xl font-semibold ${
          slot.booked
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-linear-to-r from-green-400 to-blue-500 text-white hover:scale-105 transform transition"
        }`}
      >
        {slot.booked ? "Booked" : "Book Now"}
      </button>
    </div>
  );
}
