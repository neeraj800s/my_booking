import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import SlotCard from "../components/SlotCard";
import Loader from "../components/Loader";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    api.get("/slots")
      .then(res => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      {slots.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">No slots available</p>
      ) : (
        slots.map(slot => (
          <SlotCard
            key={slot._id}
            slot={slot}
            onBook={() => {
              if (!token) {
                alert("Please login to book a slot");
                navigate("/login");
              }
            }}
          />
        ))
      )}
    </motion.div>
  );
}
