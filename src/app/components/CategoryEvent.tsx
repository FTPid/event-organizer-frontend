const CategoryEvent = () => {
  return (
    <section className="py-20 text-center text-black">
      <h2 className="text-3xl font-semibold">Event Categories</h2>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="font-semibold text-lg">Music</h3>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="font-semibold text-lg">Technology</h3>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="font-semibold text-lg">Sports</h3>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="font-semibold text-lg">Education</h3>
        </div>
      </div>
    </section>
  );
};

export default CategoryEvent;