import React from "react";
import _ from "lodash";

function Result({ sendResults, height }) {
	if (sendResults.concepts !== undefined) {
		return (
			<div className="resultTable" style={{ marginTop: height + 20 }}>
				<h4>Results</h4>
				<table className="table table-hover">
					<caption>Prediction made using Clarifai</caption>
					<thead>
						<tr className="table-light">
							<th scope="col">Categories</th>
							<th scope="col">Value</th>
							<th scope="col">Confidence</th>
						</tr>
					</thead>
					<tbody>
						<tr className="table-info">
							<th scope="row">Age</th>
							<td>{sendResults.concepts[0].name}</td>
							<td>{Math.round(sendResults.concepts[0].value * 100) + "%"}</td>
						</tr>
						<tr className="table-info">
							<th scope="row">Gender</th>
							<td>{_.upperFirst(sendResults.concepts[1].name)}</td>
							<td>{Math.round(sendResults.concepts[1].value * 100) + "%"}</td>
						</tr>
						<tr className="table-info">
							<th scope="row">Race</th>
							<td>{_.upperFirst(sendResults.concepts[2].name)}</td>
							<td>{Math.round(sendResults.concepts[2].value * 100) + "%"}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	} else {
		return <div></div>;
	}
}

export default Result;
