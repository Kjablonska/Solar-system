interface ErrorHandlerProps {
    onClose: () => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ onClose }) => {
    console.log("error")
    return (
        <div style={{position: 'absolute'}}>
            <button onClick={onClose}>x</button>
            Start date must be earlier than end date!
        </div>
    );
};

export default ErrorHandler;
