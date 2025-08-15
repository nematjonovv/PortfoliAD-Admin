function ImageUpload({
  label,
  name,
  file,
  onChange,
  recommended = "1200x800",
  accept = "image/png,image/jpeg",
}) {
  const preview = file ? URL.createObjectURL(file) : null;
  return (
    <div className="rounded-xl border-1 border-gray-300 p-4 space-y-2">
      <div className="text-sm font-medium">{label}</div>
      <div className="flex items-center gap-3">
        <div className="h-16 w-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No image</span>
          )}
        </div>
        <label className="px-3 py-2 rounded-lg bg-[#db9f7e] text-white text-sm cursor-pointer">
          Choose
          <input
            type="file"
            name={name}
            accept={accept}
            hidden
            onChange={(e) => onChange(name, e.target.files?.[0] || null)}
          />
        </label>
      </div>
      <div className="text-xs text-gray-400">
        Recommended {recommended}, JPG/PNG
      </div>
    </div>
  );
}

export default ImageUpload;
