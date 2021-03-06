import React, { useState } from "react";
import SearchField from "../components/SearchField";
import Result from "../components/Result";
import DisplayImage from "../components/DisplayImage";
import Footer from "../components/Footer";
import Error from "../components/Error";
import axios from "axios";
import Clarifai from "clarifai";
import _ from "lodash";

function App() {
	const [image, setImage] = useState("");
	const [boundingArray, setBoundingArray] = useState([]);
	const [results, setResults] = useState([]);
	const [imageHeight, setImageHeight] = useState(0);
	const [errorMessage, setErrorMessage] = useState({});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState();

	function imageurl(url) {
		//get image from response and assign to image state
		//reset bounding array to an empty array
		//set error state to false, just in case it was true prior
		//reset result array
		setLoading(true); //*Loading set to true
		setImage(url); //set Image
		//*Add a set timeout to load Image
		setTimeout(() => {
			setLoading(false); //*set loading False
		}, 1000);
		setBoundingArray([]);
		setError(false);
		setResults([]);
	}

	//unsplashAPI key and request URL
	let apikey =
		"6c6aa4aeaaacba7f565d998823cec7f4cb07ab3d1cfa9b6b8efffa557a57681a";
	let unsplashURL =
		"https://api.unsplash.com/photos/random?client_id=" + apikey;

	//unsplah API call using axios
	//triggered by random image button in return div
	function randomImage() {
		//remove previous image
		setImage("");
		//make api request with axios
		axios({
			method: "get",
			url: unsplashURL,
			params: { count: 1, query: "portrait" },
		})
			.then(function (response) {
				//get image from response and assign to image state
				//reset bounding array to an empty array
				//set error state to false, just in case it was true prior
				//reset result array
				let image = response.data[0].urls.full;
				setLoading(true); //*Loading set to true
				setImage(image); //set Image
				//*Add a set timeout to load Image
				setTimeout(() => {
					setLoading(false); //*set loading False
				}, 2000);

				setBoundingArray([]);
				setError(false);
				setResults([]);
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					//sample error console log and response
					//console.log(error.response.data); //!Rate limit Exceeded
					//console.log(error.response.status); //!403
					let errorArray = {
						data: error.response.data,
						status: error.response.status,
						apiName: "Unsplash API",
					};
					setErrorMessage(errorArray);
					setError(true);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an
					//instance of http.ClientRequest in node.js
					console.log(error.request);
					let errorArray = {
						data: error.request.data,
						status: error.request.status,
						apiName: "Unsplash API",
					};
					setErrorMessage(errorArray);
					setError(true);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log("Error", error.message);
					alert("An Error Occured");
				}
			});
	}

	//clarifai Api key and app const for Api call
	let clarifaiKey = "dbe78b3e59a44d60b6399bf6175813a1";
	const clarifaiApp = new Clarifai.App({ apiKey: clarifaiKey });

	function clarifaiApiCall(width, height) {
		// using clarifaiApi package to make request
		clarifaiApp.models
			.predict(Clarifai.DEMOGRAPHICS_MODEL, image, { maxConcepts: 1 })
			.then(function (response) {
				// do something with response
				//if response has data values in it
				if (response.outputs[0].data.regions) {
					//call the bounding box math function using respsonse
					//and image width and height from displayImage.js
					clarifaiResponse(response.outputs[0].data.regions, width, height);
				} else {
					//No value in data response error handling
					//alert("No data error");
					//outline error parameters and assign to temp object value
					let errorArray = {
						data: "Poor facial data / no data error",
						status: "404",
						apiName: "Clarifai API",
					};
					//pass error parameters to state
					setErrorMessage(errorArray);
					setError(true);
					//doesnt let bounding box be displayed for invalid pictures or
					//not enough facial regonition
					clarifaiResponse(0, 0, 0);
				}
			})
			.catch(function (error) {
				// there was an error
				if (error.response) {
					//for error reporting
					//https://docs.clarifai.com/api-guide/api-overview/status-codes
					console.log(error.response.data.status.description);
					console.log(error.response.status);
					let errorArray = {
						data: error.response.data.status.description,
						status: error.response.status,
						apiName: "Clarifai API",
					};
					setErrorMessage(errorArray);
					setError(true);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log(error.request);
					let errorArray = {
						data: error.response.data.status.description,
						status: error.response.status,
						apiName: "Clarifai API",
					};
					setErrorMessage(errorArray);
					setError(true);
				}
			});
	}

	function clarifaiResponse(response, width, height) {
		//perfrom bouding box math
		let LC = response[0].region_info.bounding_box.left_col * width;
		let TR = response[0].region_info.bounding_box.top_row * height;
		let RC = width - response[0].region_info.bounding_box.right_col * width;
		let BR = height - response[0].region_info.bounding_box.bottom_row * height;
		//create temp array
		let tempArray = [];
		//push bounding values to temp array
		tempArray.push(TR, RC, BR, LC);
		//set boundingArray state
		setBoundingArray(tempArray);
		//set results state
		setResults(response[0].data);
		//set image height state for result display
		setImageHeight(height);
	}

	function notExistImage() {
		//this axios call is here to enable me to get a different image from
		//https://www.thispersondoesnotexist.com/image
		//since we have to refresh the URL to get a second image, the axios get acts as a refresh
		//dont know if this is the right way but it worked out
		axios({
			method: "get",
			url: "https://www.thispersondoesnotexist.com/image",
		});
		let person = "https://www.thispersondoesnotexist.com/image";

		setLoading(true); //*Loading set to true
		setImage(person); //set Image
		//*Add a set timeout to load Image
		setTimeout(() => {
			setLoading(false); //*set loading False
		}, 1000);
		setBoundingArray([]);
		setError(false);
		setResults([]);
	}

	function toggleText() {
		let text = document.getElementsByClassName("instructionText");
		if (text[0].style.display === "block") {
			text[0].style.display = "none";
			document.getElementsByClassName("instructions")[0].innerHTML =
				"Show Instructions";
		} else {
			text[0].style.display = "block";
			document.getElementsByClassName("instructions")[0].innerHTML =
				"Hide Instructions";
		}
	}

	return (
		<div className="App">
			<h1>{_.upperCase("Demographic Predictor")}</h1>
			<button className="instructions btn btn-info" onClick={toggleText}>
				Show Instructions
			</button>
			<div className="instructionText">
				<p>
					This App uses an individual's image to predict their Age, Gender and
					Race
				</p>
				<p>The predictions are made using the Clarifai API</p>
				<p>
					You can paste an image URL or get a random image from Unsplash.com
				</p>
				<p>Person does not exist images are computer generated images</p>
				<p>using a Style-based Generative Adversarial Network (StyleGAN)</p>
				<p>
					and are liable to false predictions. This is just to show how AI
					generated Images
				</p>
				<p>can trick the prediction algorithm. Learn more by visiting</p>
				<a
					href="https:\\www.thispersondoesnotexist.com"
					target="_blank"
					rel=" noopener noreferrer"
					style={{ color: "blue" }}
				>
					This Person Does Not Exist
				</a>
			</div>

			<SearchField imageurl={imageurl} />
			<h5>OR</h5>
			<button className="randomBtn btn btn-secondary" onClick={randomImage}>
				Random Image
			</button>

			<button
				className="randomBtn btn btn-secondary"
				data-toggle="tooltip"
				data-placement="top"
				title="Image is computer generated"
				onClick={notExistImage}
				style={{ marginLeft: 10 }}
			>
				Person Does not Exist Image
			</button>
			<div>
				{loading ? (
					<div
						className="spinner-border text-info"
						style={{ width: 60, height: 60, marginTop: 100 }}
						role="status"
					>
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					<DisplayImage
						image={image}
						loadedImage={clarifaiApiCall}
						boundValue={boundingArray}
					/>
				)}
			</div>
			{error ? (
				<div>
					<Error errorMessage={errorMessage} />
				</div>
			) : (
				<div>
					<Result sendResults={results} height={imageHeight} />
				</div>
			)}

			<Footer />
		</div>
	);
}

export default App;
