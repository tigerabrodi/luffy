export const FormInput = () => {
  return (
    <form className="flex items-center gap-2 w-full">
      <input
        type="text"
        value="Some placeholder"
        placeholder="Wash dishes"
        className="flex-grow p-3 border border-gray-800 rounded-md text-gray-800 placeholder:opacity-50 text-lg font-medium bg-white focus:outline-none focus:shadow-md"
        style={{
          lineHeight: 'normal',
        }}
      />
      <button
        type="submit"
        className="bg-gray-800 px-4 rounded-lg text-blue-100 shadow-md h-full text-lg"
      >
        Add item
      </button>
    </form>
  )
}
