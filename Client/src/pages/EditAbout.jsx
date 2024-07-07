import React, { useEffect, useState } from "react";
import "./about.css";
import { toast } from "sonner";
const EditAbout = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const changeValues = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/auth/updatevalues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });
      const res = await response.json();
      if (!res.success) {
        toast.error(res.message || "An unexpected error occured");
        setLoading(false);
        return;
      } else {
        toast.success("Values Updated Successfully");
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message || "Server Error");
      setLoading(false);
    }
  };
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
    <div className="EditAboutPage">
      {!loading ? (
        <>
          <h1> Edit values</h1>
          <label htmlFor="heading1"> Heading 1 : </label>
          <textarea
            type="text"
            id="heading1"
            placeholder="Heading 1"
            value={value.heading1}
            onChange={(e) => setValue({ ...value, heading1: e.target.value })}
          />
          <label htmlFor="paragraph1"> Paragraph 1 : </label>
          <textarea
            rows="5"
            type="text"
            id="paragraph1"
            placeholder="Paragraph 1"
            value={value.text1}
            onChange={(e) => setValue({ ...value, text1: e.target.value })}
          />

          <label htmlFor="heading2"> Heading 2 : </label>
          <textarea
            type="text"
            id="heading2"
            placeholder="Heading 2"
            value={value.heading2}
            onChange={(e) => setValue({ ...value, heading2: e.target.value })}
          />
          <label htmlFor="paragraph2"> Paragraph 2 : </label>
          <textarea
            rows="5"
            type="text"
            id="paragraph2"
            placeholder="Paragraph 2"
            value={value.text2}
            onChange={(e) => setValue({ ...value, text2: e.target.value })}
          />
          <label htmlFor="heading3"> Heading 3 : </label>
          <textarea
            type="text"
            id="heading3"
            placeholder="Heading 3"
            value={value.heading3}
            onChange={(e) => setValue({ ...value, heading3: e.target.value })}
          />
          <label htmlFor="paragraph3"> Paragraph 3 : </label>
          <textarea
            rows="5"
            type="text"
            id="paragraph3"
            placeholder="Paragraph 3"
            value={value.text3}
            onChange={(e) => setValue({ ...value, text3: e.target.value })}
          />
          <label htmlFor="heading4"> Heading 4 : </label>
          <textarea
            type="text"
            id="heading4"
            placeholder="Heading 4"
            value={value.heading4}
            onChange={(e) => setValue({ ...value, heading4: e.target.value })}
          />
          <label htmlFor="paragraph4"> Paragraph 4 : </label>
          <textarea
            rows="5"
            type="text"
            id="paragraph4"
            placeholder="Paragraph 4"
            value={value.text4}
            onChange={(e) => setValue({ ...value, text4: e.target.value })}
          />
          <label htmlFor="heading5"> Heading 5 : </label>
          <textarea
            type="text"
            id="heading5"
            placeholder="Heading 5"
            value={value.heading5}
            onChange={(e) => setValue({ ...value, heading5: e.target.value })}
          />
          <label htmlFor="paragraph5"> Paragraph 5 : </label>
          <textarea
            rows="5"
            type="text"
            id="paragraph5"
            placeholder="Paragraph 5"
            value={value.text5}
            onChange={(e) => setValue({ ...value, text5: e.target.value })}
          />
          <button onClick={changeValues}>Update</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default EditAbout;
