import { HeadingProps } from "./types";

export function Heading(props: HeadingProps) {
	return (
		<div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold tracking-tight text-gray-900">
				{props.title}
			</h1>
		</div>
    );
}