"use client";
import { useState } from "react";
import YouTube from "react-youtube";

interface YouTubeVideoProps {
	videoId: string;
}

export default function YouTubeVideo({ videoId }: YouTubeVideoProps) {
	const [isError, setIsError] = useState(false);

	const opts = {
		height: "100%",
		width: "100%",
		playerVars: {
			autoplay: 0,
			modestbranding: 1,
			rel: 0,
		},
	};

	const handleError = (event: { target: any; data: number }) => {
		console.error("Error loading YouTube video:", videoId, event);
		setIsError(true);
	};

	const handleReady = () => {
		console.log("YouTube player ready for video:", videoId);
	};

	if (isError) {
		return (
			<div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
				<p>Video unavailable</p>
			</div>
		);
	}

	return (
		<YouTube
			videoId={videoId}
			opts={opts}
			onReady={handleReady}
			onError={handleError}
			className="absolute inset-0"
		/>
	);
}
