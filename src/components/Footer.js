import React from "react";

function Footer() {
	let dateYear = new Date().getFullYear();
	return (
		<footer className="footer">
			<h6>
				<a href="http://ugoarubaleze.com/">
					<span>
						<i className="fas fa-code" /> by Ugo Arubaleze {dateYear}
					</span>
				</a>
			</h6>
		</footer>
	);
}

export default Footer;
