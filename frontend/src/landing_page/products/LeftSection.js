import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column: Product Image */}
        <div className="col-6 p-5">
          <img src={imageURL} alt={productName} />
        </div>
        
        {/* Right Column: Title, Bio, Action Links & Store Badges */}
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={tryDemo} style={{ textDecoration: "none" }}>Try Demo</a>
            <a href={learnMore} style={{ marginLeft: "50px", textDecoration: "none" }}>
              Learn More
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" alt="Google Play Badge" />
            </a>
            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                style={{ marginLeft: "50px" }}
                alt="App Store Badge"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
