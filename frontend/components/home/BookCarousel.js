import Link from 'next/link';

export function BookCarousel({ title }) {
    const dummyBooks = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      title: `Sách ${i + 1}`,
      author: `Tác giả ${i + 1}`,
      cover: `/images/book${(i % 3) + 1}.jpg`
    }));
  
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">{title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {dummyBooks.map((book, idx) => (
              <Link 
                key={idx} 
                href={`/book/${book.id}`}
                className="bg-white rounded-lg shadow p-2 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img src={book.cover} alt={book.title} className="w-full h-32 object-cover rounded-md mb-2" />
                <div className="text-sm font-semibold text-gray-800 truncate">{book.title}</div>
                <div className="text-xs text-gray-500 truncate">{book.author}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }