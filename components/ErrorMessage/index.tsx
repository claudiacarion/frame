const ErrorMessage = ({ error }: { error: string }) => {
  return <p>{error !== "next_redirect" && error}</p>;
};

export default ErrorMessage;
