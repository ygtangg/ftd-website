import styles from "./page.module.css";

export default function Contact() {
	return (
		<div className="py-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
			<h1 className="text-5xl font-bold mb-8 text-jujube">Contact Us</h1>

			<p className="text-xl font-semibold mb-10">
				Contact us with any questions, feedback, and performance invites at:{" "}
				<a href="mailto:dance.chinese@gmail.com" className="text-jujube hover:underline">
					dance.chinese@gmail.com
				</a>
			</p>

			<div className="space-y-8">
				<p className="text-xl font-semibold mb-6">Follow and like us on:</p>
				<ul className="space-y-3 ml-4 text-xl font-semibold">
					<li>
						Instagram:{" "}
						<a
							href="https://www.instagram.com/fei_tian_dancers"
							target="_blank"
							rel="noopener noreferrer"
							className="text-jujube hover:underline"
						>
							@fei_tian_dancers
						</a>
					</li>
					<li>
						Facebook:{" "}
						<a
							href="https://www.facebook.com/FeiTianDancers"
							target="_blank"
							rel="noopener noreferrer"
							className="text-jujube hover:underline"
						>
							Fei Tian Dancers (UC Berkeley)
						</a>
					</li>
					<li>
						YouTube:{" "}
						<a
							href="https://www.youtube.com/@FeiTianUCB"
							target="_blank"
							rel="noopener noreferrer"
							className="text-jujube hover:underline"
						>
							@FeiTianUCB
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
