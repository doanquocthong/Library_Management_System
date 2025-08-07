'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/Footer';
import { Star, BookOpen, Heart, Calendar, User, Tag } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export default function BookDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(4.5);
  const [userRating, setUserRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState('');

  // Dummy data cho sách
  const book = {
    id: params.id,
    title: `Sách ${params.id}`,
    author: `Tác giả ${params.id}`,
    cover: `/images/book${(params.id % 3) + 1}.jpg`,
    description: `Đây là một cuốn sách rất hay về chủ đề ${params.id}. Cuốn sách này cung cấp những kiến thức quý báu và những góc nhìn mới mẻ về lĩnh vực này. Tác giả đã dành nhiều năm nghiên cứu và thực nghiệm để đưa ra những thông tin chính xác và hữu ích cho độc giả.`,
    longDescription: `Cuốn sách này là kết quả của nhiều năm nghiên cứu và thực nghiệm của tác giả. Với cách viết dễ hiểu và logic, cuốn sách sẽ giúp bạn hiểu rõ hơn về chủ đề này và áp dụng vào thực tế một cách hiệu quả.

Nội dung sách bao gồm:
- Phần 1: Giới thiệu tổng quan
- Phần 2: Các khái niệm cơ bản
- Phần 3: Phương pháp thực hành
- Phần 4: Các ví dụ thực tế
- Phần 5: Tổng kết và hướng dẫn

Cuốn sách phù hợp cho cả người mới bắt đầu và những ai đã có kinh nghiệm trong lĩnh vực này.`,
    category: 'Công nghệ thông tin',
    publisher: 'Nhà xuất bản UTH',
    publishDate: '2024',
    pages: 350,
    language: 'Tiếng Việt',
    isbn: '978-1234567890',
    available: true,
    totalCopies: 15,
    borrowedCopies: 8,
    rating: 4.5,
    reviewCount: 128,
    tags: ['Công nghệ', 'Lập trình', 'Học tập', 'Tham khảo']
  };

  const reviews = [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      rating: 5,
      date: '2024-01-15',
      comment: 'Cuốn sách rất hay và bổ ích. Tôi đã học được nhiều điều từ cuốn sách này.'
    },
    {
      id: 2,
      user: 'Trần Thị B',
      rating: 4,
      date: '2024-01-10',
      comment: 'Nội dung sách rất chi tiết và dễ hiểu. Tuy nhiên có một số phần hơi khó.'
    },
    {
      id: 3,
      user: 'Lê Văn C',
      rating: 5,
      date: '2024-01-05',
      comment: 'Tuyệt vời! Đây là một trong những cuốn sách hay nhất tôi từng đọc về chủ đề này.'
    }
  ];

  const handleBorrow = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để mượn sách!');
      return;
    }
    alert('Đã gửi yêu cầu mượn sách!');
  };

  const handleSubmitReview = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để đánh giá!');
      return;
    }
    if (userRating === 0) {
      alert('Vui lòng chọn số sao!');
      return;
    }
    alert('Cảm ơn bạn đã đánh giá!');
    setShowReviewForm(false);
    setReview('');
    setUserRating(0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* đường dẫn sách */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Trang chủ</span>
          <span className="mx-2">/</span>
          <span>Sách</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{book.title}</span>
        </nav>

        {/* chi tiết sách */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* hình ảnh sách */}
            <div className="lg:col-span-1">
              <div className="relative">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
                <div className="absolute top-2 right-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-500'} shadow-md hover:scale-110 transition`}
                  >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>

            {/* thông tin sách */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  <p className="text-lg text-gray-600 mb-4">Tác giả: {book.author}</p>
                </div>
              </div>

              {/* đánh giá sách */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={20} 
                      className={`${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({book.reviewCount} đánh giá)</span>
              </div>

              {/* chi tiết sách */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Thể loại: {book.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Năm xuất bản: {book.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Số trang: {book.pages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">NXB: {book.publisher}</span>
                </div>
              </div>

              {/* trạng thái sách */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Trạng thái: 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${book.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {book.available ? 'Còn sẵn' : 'Hết sách'}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Còn lại: {book.totalCopies - book.borrowedCopies}/{book.totalCopies} cuốn
                    </p>
                  </div>
                </div>
              </div>

              {/* nút mượn sách và tải xuống */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBorrow}
                  disabled={!book.available}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  <BookOpen size={20} />
                  Mượn sách
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* mô tả */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.longDescription}</p>
          </div>
        </div>

        {/* danh sách đánh giá */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Đánh giá ({book.reviewCount})</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Viết đánh giá
            </button>
          </div>

          {/* form đánh giá */}
          {showReviewForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Viết đánh giá của bạn</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá:</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="focus:outline-none"
                    >
                      <Star 
                        size={24} 
                        className={`${star <= userRating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:text-yellow-400`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nhận xét:</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Chia sẻ cảm nhận của bạn về cuốn sách này..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSubmitReview}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Gửi đánh giá
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{review.user}</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          size={16} 
                          className={`${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 