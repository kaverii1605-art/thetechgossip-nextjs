
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#EAF1F8]">

      {/* Page Header */}
      <section className="px-5 pb-10 pt-12 md:pb-6 md:pt-10">
        <div className="mx-auto max-w-[1200px]">

          {/* Breadcrumb */}
          <div className="mb-7 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-[#087F83]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-[#087F83]">Contact Us</span>
          </div>

          {/* Heading */}
          <div className="grid gap-6 md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[#087F83]">
                We're Here to Help
              </p>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#163B55] md:text-2.75rem">
                Let's make your
                <span className="text-[#087F83]"> next move </span>
                happen.
              </h1>
            </div>
{/* 
            <p className="max-w-sm text-sm leading-7 text-gray-600 md:pb-2">
              Have a question, partnership idea, or business inquiry?
              Tell us what you have in mind. Our team would love to hear from you.
            </p> */}
          </div>

        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="mx-auto grid max-w-[1200px] gap-7 lg:grid-cols-[0.75fr_1.6fr]">

          {/* Left Information Panel */}
          <aside className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#163B55] via-[#087F83] to-[#0C6875] p-7 text-white md:p-9">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[35px] border-white/5" />

            <div className="relative z-10">

              {/* Icon */}
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-[#B8F0E8]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
                </svg>
              </div>

              <p className="text-xs font-bold uppercase tracking-[2px] text-[#B8F0E8]">
                Get in Touch
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
                We'd love to hear from you.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/80">
                Whether you're looking to collaborate, share an idea,
                or simply ask a question, get in touch with TheTechGossip.
              </p>

              {/* Decorative Accent */}
              <div className="mt-8 h-1 w-16 rounded-full bg-[#E9A23B]" />

            </div>

            {/* Bottom Information */}
            <div className="relative z-10 mt-12 border-t border-white/20 pt-7">

              <p className="text-xs font-bold uppercase tracking-widest text-[#B8F0E8]">
                Our Focus
              </p>

              <div className="mt-5 space-y-4">

                {[
                  "Business & Media Inquiries",
                  "Partnership Opportunities",
                  "Editorial & General Queries",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-white"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-[#B8F0E8]">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}

              </div>

              <div className="mt-10 rounded-xl border border-white/15 bg-white/10 p-4">
                <p className="text-sm font-semibold text-white">
                  TheTechGossip
                </p>
                <p className="mt-2 text-xs leading-6 text-white/75">
                  Technology news, insights and perspectives for the
                  business and technology community.
                </p>
              </div>

            </div>

          </aside>

          {/* Contact Form */}
          <div className="rounded-2xl border border-[#D6E3EC] bg-white p-6 shadow-[0_12px_40px_rgba(22,59,85,0.07)] md:p-10 lg:p-12">

            {/* Form Heading */}
            <div className="mb-9 flex flex-col justify-between gap-3 border-b border-gray-100 pb-7 sm:flex-row sm:items-center">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[#087F83]">
                  Contact TheTechGossip
                </p>

                <h2 className="text-2xl font-bold text-[#163B55]">
                  Send an Inquiry
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Complete the form and share your requirements with us.
                </p>
              </div>

              <span className="w-fit rounded-full bg-[#DCEFF0] px-4 py-2 text-xs font-semibold text-[#087F83]">
                Contact Form
              </span>
            </div>

            <form className="space-y-6">

              {/* Name and Email */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div>
                  <label htmlFor="your-name" className="mb-2 block text-sm font-semibold text-[#263746]">
                    Your Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="your-name"
                    name="your-name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={400}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-[#DCE4EC] bg-[#F7FAFC] px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#087F83] focus:bg-white focus:ring-4 focus:ring-[#087F83]/10"
                  />
                </div>

                <div>
                  <label htmlFor="your-email" className="mb-2 block text-sm font-semibold text-[#263746]">
                    Company Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="your-email"
                    name="your-email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={400}
                    placeholder="name@company.com"
                    className="w-full rounded-lg border border-[#DCE4EC] bg-[#F7FAFC] px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#087F83] focus:bg-white focus:ring-4 focus:ring-[#087F83]/10"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company-name" className="mb-2 block text-sm font-semibold text-[#263746]">
                    Company Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="company-name"
                    name="company-name"
                    type="text"
                    required
                    maxLength={400}
                    placeholder="Your organization"
                    className="w-full rounded-lg border border-[#DCE4EC] bg-[#F7FAFC] px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#087F83] focus:bg-white focus:ring-4 focus:ring-[#087F83]/10"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone-number" className="mb-2 block text-sm font-semibold text-[#263746]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="phone-number"
                    name="phone-number"
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={400}
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-[#DCE4EC] bg-[#F7FAFC] px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#087F83] focus:bg-white focus:ring-4 focus:ring-[#087F83]/10"
                  />
                </div>

              </div>

              {/* Subject */}
              <div>
                <label htmlFor="your-subject" className="mb-2 block text-sm font-semibold text-[#263746]">
                  Subject <span className="text-red-500">*</span>
                </label>

                <input
                  id="your-subject"
                  name="your-subject"
                  type="text"
                  required
                  maxLength={400}
                  placeholder="Enter the subject of your inquiry"
                  className="w-full rounded-lg border border-[#DCE4EC] bg-[#F7FAFC] px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#087F83] focus:bg-white focus:ring-4 focus:ring-[#087F83]/10"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="your-message" className="mb-2 block text-sm font-semibold text-[#263746]">
                  Your Message <span className="font-normal text-gray-400">(Optional)</span>
                </label>

                <textarea
                  id="your-message"
                  name="your-message"
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell us a little more about your inquiry..."
                  className="w-full resize-y rounded-lg border border-[#DCE4EC] bg-[#F7FAFC] px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#087F83] focus:bg-white focus:ring-4 focus:ring-[#087F83]/10"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">

                <p className="text-xs leading-5 text-gray-400">
                  <span className="text-red-500">*</span> Required fields
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#087F83] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#087F83]/20 transition hover:-translate-y-0.5 hover:bg-[#06696D] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#087F83]/20"
                >
                  Send Message
                  <span className="text-lg">→</span>
                </button>

              </div>

            </form>
          </div>

        </div>
      </section>

    </main>
  );
}
