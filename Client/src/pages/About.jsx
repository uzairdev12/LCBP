import React, { useEffect, useState } from "react";
import "./about.css";
import { toast } from "sonner";
const About = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/getvalues`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (!res.success) {
        toast.error(res.message || "An unexpected error occured");
        setLoading(false);
        return;
      } else {
        setValue(res.value);
        console.log(res.value);
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message || "Server Error");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="aboutPage">
      {!loading ? (
        <>
          <h1>{value.heading1}</h1>
          <p>{value.text1}</p>
          <h1>{value.heading2}</h1>
          <p>{value.text2}</p>
          <h1>{value.heading3}</h1>
          <p>{value.text3}</p>
          <h1>{value.heading4}</h1>
          <p>{value.text4}</p>
          <h1>{value.heading5}</h1>
          <p>{value.text5}</p>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default About;
