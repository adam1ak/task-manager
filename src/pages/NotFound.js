import { ReactComponent as YourSvg } from '../utils/NotFound.svg'

function NotFound() {

    const ErrorMessage = ({ i }) => (
        <p key={i} className='text-2xl font-medium uppercase'>Error{' '}
            <span className='font-bold text-[#B91C1C]'>404</span> page not found
        </p>
    );

    return (
        <div className="flex h-full w-full flex-col items-center overflow-hidden">
            <div className="flex flex-grow flex-col items-center justify-center overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => <ErrorMessage i={`top-${i}`} />)}
            </div>

            <YourSvg className='my-6 flex-shrink-0' height={324} />

            <div className="flex flex-grow flex-col items-center justify-center overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => <ErrorMessage i={`bottom-${i}`} />)}
            </div>
        </div>
    );
}

export default NotFound;