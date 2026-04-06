export function About(){
	return(
		<>
			<div className="mx-auto gray-67 p-3 rounded-4xl flex-col gap-10">
				<h1 className="font-bold text-4xl text-center mt-5 mb-10">About Archer's Lab</h1>
				<h2 className="text-s">THE BRAINS BEHIND THE MASTERPIECE</h2>
				<div className="gray-89 p-5 flex gap-5 rounded-4xl">
					<img src="/src/resources/beatles.png" className="h-40 w-40 rounded-2xl"></img>
					<div className="justify-center flex text-center mx-auto">
						<ul className="space-y-5">
							<li>Karl Deejay <span className="italic">"Omangoat"</span> Omandac</li>
							<li>Byron Scott <span className="italic">"COVID-26"</span> Ang</li>
							<li>John William <span className="italic">"Fourier"</span> Go</li>
							<li>John Lorens <span className="italic">"Failure++++"</span> Tee</li>
						</ul>
					</div>
				</div>
				<div className="flex flex-row gap-5 mt-10">
					<div>
						<h2 className="text-s">BACKEND NODE PACKAGES</h2>
						<div className="gray-89 p-5 rounded-4xl text-center">
								<ul>
									<li>bcrypt@6.0.0</li>
									<li>chalk@4.1.2</li>
									<li>connect-mongodb-session@5.0.0</li>
									<li>cors@2.8.6</li>
									<li>dotenv@17.3.1</li>
									<li>express-async-handler@1.2.0</li>
									<li>express-session@1.19.0</li>
									<li>express@5.2.1</li>
									<li>mongoose@9.3.0</li>
									<li>nodemon@3.1.14</li>
								</ul>
						</div>
					</div>
					<div>
						<h2 className="text-s">FRONTEND NODE PACKAGES</h2>
						<div className="gray-89 p-5 rounded-4xl text-center">
							<ul>
								<li>@eslint/js@9.39.3</li>
								<li>@tailwindcss/postcss@4.1.18</li>
								<li>@types/react-dom@19.2.3</li>
								<li>@types/react@19.2.14</li>
								<li>@vitejs/plugin-react@5.1.4</li>
								<li>autoprefixer@10.4.24</li>
								<li>eslint-plugin-react-hooks@7.0.1</li>
								<li>eslint-plugin-react-refresh@0.4.26</li>
								<li>eslint@9.39.3</li>
								<li>globals@16.5.0</li>
								<li>react-datepicker@9.1.0</li>
								<li>react-dom@19.2.4</li>
								<li>react-router-dom@7.13.0</li>
								<li>react@19.2.4</li>
								<li>tailwindcss@4.1.18</li>
								<li>vite-plugin-svgr@5.0.0</li>
								<li>vite@7.3.1</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);

}
