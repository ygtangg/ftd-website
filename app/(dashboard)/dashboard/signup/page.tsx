"use client";

export default function MemberDashboard() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Member Dashboard</h1>

			<div className="p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-4">Performance Sign-ups</h2>

				<div className="mb-6">
					<h3 className="font-medium mb-2">Available Performances</h3>
					<div className="border rounded-lg overflow-hidden">
						<div className="grid grid-cols-4 bg-gray-100 p-3">
							<div className="font-medium">Title</div>
							<div className="font-medium">Date</div>
							<div className="font-medium">Location</div>
							<div className="font-medium">Actions</div>
						</div>
						<div className="p-3 border-t grid grid-cols-4">
							<div>Example Performance</div>
							<div>Dec 5, 2024</div>
							<div>Zellerbach Hall</div>
							<div>
								<button className="bg-jujube text-white px-3 py-1 rounded text-sm hover:bg-jujube/80">
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h3 className="font-medium mb-2">My Performances</h3>
					<div className="border rounded-lg overflow-hidden">
						<div className="grid grid-cols-4 bg-gray-100 p-3">
							<div className="font-medium">Title</div>
							<div className="font-medium">Date</div>
							<div className="font-medium">Location</div>
							<div className="font-medium">Status</div>
						</div>
						<div className="p-3 border-t grid grid-cols-4">
							<div>Example Performance</div>
							<div>Dec 5, 2024</div>
							<div>Zellerbach Hall</div>
							<div>
								<span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
									Confirmed
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
