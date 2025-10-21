"use client";

import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validasi nama lengkap
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Nama lengkap minimal 2 karakter";
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi nomor telepon
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi";
    } else if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    // Validasi pesan
    if (!formData.message.trim()) {
      newErrors.message = "Pesan harus diisi";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Pesan minimal 10 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Reset form setelah berhasil
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="relative py-20 md:py-[120px]">
      <div className="absolute left-0 top-0 -z-[1] h-full w-full dark:bg-dark"></div>
      <div className="absolute left-0 top-0 -z-[1] h-1/2 w-full bg-[#E9F9FF] dark:bg-dark-700 lg:h-[45%] xl:h-1/2"></div>
      <div className="container px-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="ud-contact-content-wrapper">
              <div className="ud-contact-title mb-12 lg:mb-[150px]">
                <span className="mb-6 block text-base font-medium text-dark dark:text-white">
                  HUBUNGI KAMI
                </span>
                <h2 className="max-w-[300px] text-[35px] font-semibold leading-[1.14] text-dark dark:text-white">
                  Mari bersilaturahmi dengan kami.
                </h2>
              </div>
              <div className="mb-12 flex flex-wrap justify-between lg:mb-0">
                <div className="mb-8 flex w-[330px] max-w-full">
                  <div className="mr-6 text-[32px] text-primary">
                    <svg
                      width="29"
                      height="35"
                      viewBox="0 0 29 35"
                      className="fill-current"
                    >
                      <path d="M14.5 0.710938C6.89844 0.710938 0.664062 6.72656 0.664062 14.0547C0.664062 19.9062 9.03125 29.5859 12.6406 33.5234C13.1328 34.0703 13.7891 34.3437 14.5 34.3437C15.2109 34.3437 15.8672 34.0703 16.3594 33.5234C19.9688 29.6406 28.3359 19.9062 28.3359 14.0547C28.3359 6.67188 22.1016 0.710938 14.5 0.710938ZM14.9375 32.2109C14.6641 32.4844 14.2812 32.4844 14.0625 32.2109C11.3828 29.3125 2.57812 19.3594 2.57812 14.0547C2.57812 7.71094 7.9375 2.625 14.5 2.625C21.0625 2.625 26.4219 7.76562 26.4219 14.0547C26.4219 19.3594 17.6172 29.2578 14.9375 32.2109Z" />
                      <path d="M14.5 8.58594C11.2734 8.58594 8.59375 11.2109 8.59375 14.4922C8.59375 17.7188 11.2187 20.3984 14.5 20.3984C17.7812 20.3984 20.4062 17.7734 20.4062 14.4922C20.4062 11.2109 17.7266 8.58594 14.5 8.58594ZM14.5 18.4297C12.3125 18.4297 10.5078 16.625 10.5078 14.4375C10.5078 12.25 12.3125 10.4453 14.5 10.4453C16.6875 10.4453 18.4922 12.25 18.4922 14.4375C18.4922 16.625 16.6875 18.4297 14.5 18.4297Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-[18px] text-lg font-semibold text-dark dark:text-white">
                      Lokasi Masjid
                    </h3>
                    <p className="text-base text-body-color dark:text-dark-6">
                      Villa Mutiara Biru XVIII No. 1<br />
                      Kota Makassar, Sulawesi Selatan, 90243
                    </p>
                  </div>
                </div>
                <div className="mb-8 flex w-[330px] max-w-full">
                  <div className="mr-6 text-[32px] text-primary">
                    <svg
                      width="34"
                      height="25"
                      viewBox="0 0 34 25"
                      className="fill-current"
                    >
                      <path d="M30.5156 0.960938H3.17188C1.42188 0.960938 0 2.38281 0 4.13281V20.9219C0 22.6719 1.42188 24.0938 3.17188 24.0938H30.5156C32.2656 24.0938 33.6875 22.6719 33.6875 20.9219V4.13281C33.6875 2.38281 32.2656 0.960938 30.5156 0.960938ZM30.5156 2.875C30.7891 2.875 31.0078 2.92969 31.2266 3.09375L17.6094 11.3516C17.1172 11.625 16.5703 11.625 16.0781 11.3516L2.46094 3.09375C2.67969 2.98438 2.89844 2.875 3.17188 2.875H30.5156ZM30.5156 22.125H3.17188C2.51562 22.125 1.91406 21.5781 1.91406 20.8672V5.00781L15.0391 12.9922C15.5859 13.3203 16.1875 13.4844 16.7891 13.4844C17.3906 13.4844 17.9922 13.3203 18.5391 12.9922L31.6641 5.00781V20.8672C31.7734 21.5781 31.1719 22.125 30.5156 22.125Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-[18px] text-lg font-semibold text-dark dark:text-white">
                      Hubungi Kami
                    </h3>
                    <p className="text-base text-body-color dark:text-dark-6">
                      masjidjawahiruzzarqa17@gmail.com
                    </p>
                    <p className="mt-1 text-base text-body-color dark:text-dark-6">
                      +62 813-5488-6540
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div
              className="wow fadeInUp rounded-lg bg-white px-8 py-10 shadow-testimonial dark:bg-dark-2 dark:shadow-none sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]"
              data-wow-delay=".2s
              "
            >
              <h3 className="mb-8 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]">
                Kirim Pesan Kepada Kami
              </h3>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700 dark:bg-green-900 dark:text-green-300">
                  <p className="text-sm font-medium">✓ Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-300">
                  <p className="text-sm font-medium">✗ Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <label
                    htmlFor="fullName"
                    className="mb-4 block text-sm text-body-color dark:text-dark-6"
                  >
                    Nama Lengkap*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ahmad Hidayat"
                    className={`w-full border-0 border-b bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:outline-none dark:text-white ${errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#f1f1f1] focus:border-primary dark:border-dark-3"
                      }`}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="email"
                    className="mb-4 block text-sm text-body-color dark:text-dark-6"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contoh@email.com"
                    className={`w-full border-0 border-b bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:outline-none dark:text-white ${errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#f1f1f1] focus:border-primary dark:border-dark-3"
                      }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="phone"
                    className="mb-4 block text-sm text-body-color dark:text-dark-6"
                  >
                    Nomor Telepon*
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0812-3456-7890"
                    className={`w-full border-0 border-b bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:outline-none dark:text-white ${errors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#f1f1f1] focus:border-primary dark:border-dark-3"
                      }`}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div className="mb-[30px]">
                  <label
                    htmlFor="message"
                    className="mb-4 block text-sm text-body-color dark:text-dark-6"
                  >
                    Pesan*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tulis pesan Anda di sini..."
                    className={`w-full resize-none border-0 border-b bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:outline-none dark:text-white ${errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#f1f1f1] focus:border-primary dark:border-dark-3"
                      }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>
                <div className="mb-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center rounded-md px-10 py-3 text-base font-medium text-white transition duration-300 ease-in-out ${isSubmitting
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-primary hover:bg-primary/90"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      "Kirim Pesan"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
