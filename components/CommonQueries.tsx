export default function CommonQueries() {
  const faqs = [
    {
      question: "Are these deals global?",
      answer: "Yes, 90% of our deals, including AWS and Google Cloud, are available to founders worldwide.",
      isOpen: true
    },
    {
      question: "Do I need to be incorporated?",
      answer: "",
      isOpen: false
    },
    {
      question: "How often are grants updated?", 
      answer: "",
      isOpen: false
    },
    {
      question: "Can I cancel anytime?",
      answer: "",
      isOpen: false
    }
  ]

  return (
    <section className="py-5 md:py-6 md:py-14 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 md:mb-4 md:mb-6 font-mono uppercase">Common_Queries</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#f6f6f8] neo-border p-6 cursor-pointer hover:bg-gray-100 transition-colors">
              <h4 className="font-bold text-lg mb-2 flex justify-between font-mono">
                {faq.question} 
                <span className="material-symbols-outlined">expand_more</span>
              </h4>
              {faq.isOpen && faq.answer && (
                <p className="text-gray-600 text-sm font-mono">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}