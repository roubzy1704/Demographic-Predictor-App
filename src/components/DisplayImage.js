import React from "react";

function DisplayImage({ image, loadedImage, boundValue }) {
	function handleLoad() {
		let width = document.getElementById("image").width;
		let height = document.getElementById("image").height;
		loadedImage(width, height);
	}

	return (
		<div className="center">
			<div className="image">
				<img id="image" onLoad={handleLoad} src={image} alt="" />
				<div
					className="bounding-box"
					style={{
						top: boundValue[0],
						right: boundValue[1],
						bottom: boundValue[2],
						left: boundValue[3],
					}}
				></div>
			</div>
		</div>
	);
}

export default DisplayImage;
