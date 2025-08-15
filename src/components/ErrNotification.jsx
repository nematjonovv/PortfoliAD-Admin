
function ErrNotification({isErr,message }) {
  let classes =
    "flex fixed bottom-5 transition-all z-1 py-5 px-8 text-white rounded-md ";

  if (isErr) {
    classes += "right-5 bg-red-400";
  }else {
    classes += "right-[-100%]";
  }

  return (
    <div className={classes}>
      <i className="bi bi-exclamation-circle mr-2"></i>
      <p>{message}</p>
    </div>
  );
}

export default ErrNotification;
