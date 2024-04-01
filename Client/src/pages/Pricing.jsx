import React from "react";
import "./home.css";
const Pricing = () => {
  return (
    <>
      <section id="pricing">
        <div className="container">
          <div className="title-block">
            <h2>Plans and Pricing</h2>
            <p>
              The best opportunity to earn online by using your contacts and
              social circle.
            </p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="pricing-box">
                <h3 className="demo">Basic Plan</h3>
                <h6>750 pkr</h6>
                <small>forever</small>
                <p>Basic Plan gives you alot of features.</p>
                <div className="divider-light"></div>
                <ul>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Post your gigs
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    10% reffer bonus
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    boxes
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    spins
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Free online Courses
                  </li>
                </ul>
                <div className="text-center">
                  <a className="btn btn-buy">Buy now</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pricing-box">
                <h3>Standard Plan</h3>
                <h6>1500 pkr</h6>
                <small>Forever</small>
                <p>Outrank your competitors with this amazing plan</p>
                <div className="divider-light"></div>
                <ul>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Post your gigs
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    15% reffer bonus
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    boxes
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    spins
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Free online Courses
                  </li>
                </ul>
                <div className="text-center">
                  <a className="btn btn-buy">Buy now</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pricing-box">
                <h3>Premium plan</h3>
                <h6>2500 pkr</h6>
                <small>Forever</small>
                <p>
                  Earn significantly more than others with this amazing plan
                </p>
                <div className="divider-light"></div>
                <ul>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Post your gigs
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    25% reffer bonus
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    boxes and spins
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline demo"></i>
                    Free online Courses
                  </li>
                  <li>
                    <i className="icon ion-md-checkmark-circle-outline"></i>
                    Boosted gigs - <span>¡New!</span>
                  </li>
                </ul>
                <div className="text-center">
                  <a className="btn btn-buy">Buy now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
