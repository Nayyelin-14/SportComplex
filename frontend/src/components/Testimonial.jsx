import React from 'react';

const testimonials = [
  {
    name: 'John Doe',
    title: 'CEO, Example Corp',
    image: 'https://via.placeholder.com/150',
    quote: 'This is an amazing service! It really helped our business grow.',
  },
  {
    name: 'Jane Smith',
    title: 'CTO, Another Corp',
    image: 'https://via.placeholder.com/150',
    quote: 'Incredible experience! The team was professional and very supportive.',
  },
  {
    name: 'Sam Wilson',
    title: 'Marketing Head, Company XYZ',
    image: 'https://via.placeholder.com/150',
    quote: 'We saw immediate results and the feedback has been overwhelmingly positive.',
  },
];

const TestimonialCard = ({ image, name, title, quote }) => (
  <div data-aos="zoom-in"
  data-aos-duration="300" className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex items-center">
      <img className="w-16 h-16 rounded-full mr-4" src={image} alt={name} />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
    <p className="mt-4 text-gray-700">{quote}</p>
  </div>
);

const Testimonials = () => {
  return (
    <div className="bg-white my-10 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">What Our Clients Say</h2>
        <p className="text-xs text-gray-400 text-center mb-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis delectus architecto error nesciunt,
            </p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              image={testimonial.image}
              name={testimonial.name}
              title={testimonial.title}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

