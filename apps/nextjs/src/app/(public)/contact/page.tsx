import { getSection } from "@acme/cms";

import { ContactForm } from "./_components/contact-form";
import { IconSocials } from "./_components/icon-socials";

const contactSection = getSection("contact-page");

const ContactPage = () => {
  return (
    <section
      className="min-h-screen bg-cover"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1709884735626-63e92727d8b6)",
      }}
    >
      <div className="flex min-h-screen flex-col bg-black/60">
        <div className="container mx-auto flex flex-1 flex-col px-6 py-12">
          <div className="flex-1 lg:-mx-6 lg:flex lg:items-center">
            <div className="text-white lg:mx-6 lg:w-1/2">
              <h1 className="text-2xl font-semibold capitalize lg:text-3xl">
                {contactSection.title}
              </h1>

              <p className="mt-6 max-w-xl">{contactSection.description}</p>

              <button className="mt-6 transform rounded-md bg-blue-600 px-8 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                {contactSection.button}
              </button>

              <div className="mt-6 md:mt-8">
                <h3 className="text-gray-300">
                  {contactSection["social-media-text"]}
                </h3>

                <IconSocials />
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
