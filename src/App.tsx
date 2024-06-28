function App() {
  return (
    <main className="h-full w-[582px] flex flex-col items-center pt-20 gap-12">
      <div className="flex items-center p-2 gap-16">
        <div className="flex flex-col items-center">
          <h1 className="sr-only">Luffy</h1>
          <h2 className="text-3xl font-bold text-gray-800">Todos done</h2>
          <p className="text-gray-700 font-medium text-base text-center">
            Keep working hard
          </p>
        </div>
        <div className="bg-gray-800 flex items-center justify-center size-32 rounded-full">
          <span className="text-blue-100 font-medium text-2xl">1/3</span>
        </div>
      </div>

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
    </main>
  )
}

export default App
