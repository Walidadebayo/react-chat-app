const Toast = () => {
  return (
    <div className="alert alert-primary alert-dismissible fade show">
      Alert
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Toast;
