import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const contact = () => {
  const navigate = useNavigate();
  return (
    <div className="content">
      <div className="Back" onClick={() => navigate("/")}>
        {" "}
        <ArrowBackIcon />
      </div>
      <div
        className="container"
        style={{
          margin: "50px 0 0 0",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row align-items-center">
              <div className="col-lg-7 mb-5 mb-lg-0">
                <h2 className="mb-5">
                  Contact LCBP Admins <br />
                  It's easy.
                </h2>

                <form
                  className="border-right pr-5 mb-5"
                  method="post"
                  id="contactForm"
                  name="contactForm"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="fname"
                        id="fname"
                        placeholder="First name"
                        style={{
                          outline: "none !important",
                          border: "none",
                          borderRadius: "10px",
                          color: "black",
                          backgroundColor: "offwhite",
                        }}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="lname"
                        id="lname"
                        placeholder="Last name"
                        style={{
                          outline: "none !important",
                          border: "none",
                          borderRadius: "10px",
                          color: "black",
                          backgroundColor: "offwhite",
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Email"
                        style={{
                          outline: "none !important",
                          border: "none",
                          borderRadius: "10px",
                          color: "black",
                          backgroundColor: "offwhite",
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        cols="30"
                        rows="7"
                        style={{
                          outline: "none !important",
                          border: "none",
                          borderRadius: "10px",
                          color: "black",
                          backgroundColor: "offwhite",
                        }}
                        placeholder="Write your message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="submit"
                        value="Send Message"
                        className="btn btn-primary rounded-0 py-2 px-4"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      />
                      <span className="submitting"></span>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4 ml-auto">
                <h3 className="mb-4">Let's talk about everything.</h3>
                <p>
                  We are dedicated to helping our clients achieve their goals.
                  we will remove all your doubts and help you be successful in
                  life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contact;
