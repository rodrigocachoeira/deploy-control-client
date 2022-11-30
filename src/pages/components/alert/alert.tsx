import { AlertProps } from "./types";

export function Alert(props: AlertProps) {

    function getAlertBg(type: string) {
        const defaultClasses = 'mb-10 border-t-4 rounded-b text-teal-900 px-4 py-3 shadow-md w-5/12';

        switch (type) {
            case 'success':
                return defaultClasses + ' bg-teal-100 border-teal-500';
			case 'error':
				return defaultClasses + ' bg-red-100 border-red-500';
        }
    }

	function getIcon(type: string) {
        const defaultClasses = 'fill-current h-6 w-6 mr-4';

        switch(type) {
            case 'success':
                return defaultClasses + ' text-teal-500';
			case 'error':
                return defaultClasses + ' text-red-500';
        }
    }

	return (
		<div className={ getAlertBg(props.type) } role="alert">
			<div className="flex">
				<div>
					<p className="font-bold">{ props.title }</p>
					<p className="text-sm">{ props.description }</p>
				</div>
			</div>
		</div>
    );
}