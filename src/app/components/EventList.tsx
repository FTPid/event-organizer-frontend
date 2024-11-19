const EventList = () => {
  const events = [
    { id: 1, title: 'Music Concert', date: '2024-12-01' },
    { id: 2, title: 'Tech Conference', date: '2024-12-05' },
    { id: 3, title: 'Sports Tournament', date: '2024-12-10' },
    { id: 4, title: 'Education Seminar', date: '2024-12-15' },
  ];

  return (
    <section className="py-20 text-center text-black">
      <h2 className="text-3xl font-semibold">Upcoming Events</h2>
      <div className="mt-8 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="font-semibold text-xl">{event.title}</h3>
            <p className="text-gray-600">Date: {event.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventList;