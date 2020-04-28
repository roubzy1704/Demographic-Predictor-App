import React, { useState } from "react";

function SearchField(props) {
	const [imageURL, setImageURL] = useState("");

	function handleClick() {
		props.imageurl(imageURL);
		setImageURL("");
	}

	function handleChange(event) {
		setImageURL(event.target.value);
		console.log(event.target.value);
	}

	//handle user pressing enter button for search
	//with button type submit
	function submitForm(e) {
		// Cancel the default action
		e.preventDefault();
		var btn = document.getElementsByClassName("submitBtn");
		if (e.keyCode === 13) {
			// Trigger the button element with a click
			btn[0].click();
			// e.preventDefault();
		}
	}

	return (
		<div>
			<form className="searchForm" onSubmit={submitForm}>
				<div className="form-group">
					<input
						type="text"
						name="search"
						placeholder="Paste Image URL here"
						onChange={handleChange}
						value={imageURL}
					/>

					<button
						className="btn btn-secondary submitBtn"
						type="submit"
						onClick={handleClick}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default SearchField;
