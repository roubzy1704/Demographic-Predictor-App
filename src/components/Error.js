import React from "react";
import { MDBNotification } from "mdbreact";

function Error({ errorMessage }) {
	return (
		<div className="errorReport">
			<MDBNotification
				show
				fade
				iconClassName="text-danger"
				title={errorMessage.apiName + " error"}
				message={errorMessage.data}
				text={"Code " + errorMessage.status}
			/>
		</div>
	);
}

export default Error;
