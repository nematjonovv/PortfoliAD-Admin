function SuccessNotification({ isSuccess, message }) {
  let classes =
    "flex fixed bottom-5 transition-all z-1 py-5 px-8 text-white rounded-md ";

  if (isSuccess) {
    classes += "right-5 bg-green-400";
  } else {
    classes += "right-[-100%]";
  }

  return (
    <div className={classes}>
      <i className="bi bi-check-circle mr-2"></i>
      <p>{message}</p>
    </div>
  );
}

export default SuccessNotification;
