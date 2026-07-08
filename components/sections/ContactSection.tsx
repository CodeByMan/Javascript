import { AlertCircle, Mail, Phone } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/data/portfolio";

const contactLinks = [
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    label: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: <Phone className="h-5 w-5 text-primary" />,
    label: contact.mobile,
    href: `tel:${contact.mobile.replace(/\s+/g, "")}`,
  },
  {
    icon: <FaLinkedin className="h-5 w-5 text-primary" />,
    label: "LinkedIn Profile",
    href: contact.linkedin,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="container-section scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          subtitle="Feel free to reach out for MERN Stack or Next.js internships, junior roles, freelance work, backend API development, AI integrations, or project collaboration."
          alignment="center"
        />

        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 p-4 shadow-md shadow-primary/20 backdrop-blur-md transition-all duration-500 animate-fadeUp xs:p-5 sm:p-8 lg:p-10">
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-primary via-[#e75e50] to-transparent opacity-70" />

          <div className="relative z-10 grid w-full min-w-0 grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="w-full min-w-0 space-y-4 sm:space-y-6">
              <h2 className="bg-gradient-to-r from-primary to-[#e75e50] bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                Get In Touch
              </h2>

              <div className="mt-2 h-[2px] w-20 rounded-full bg-gradient-to-r from-primary to-[#e75e50]" />

              <p className="mt-4 leading-relaxed text-muted-foreground">
                {contact.message}
              </p>

              <div className="mt-6 space-y-4">
                {contactLinks.map((item) => {
                  const opensExternally = item.href.startsWith("http");

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target={opensExternally ? "_blank" : undefined}
                      rel={
                        opensExternally
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex min-w-0 items-center gap-3 rounded-lg p-3 transition-colors hover:bg-primary/5"
                    >
                      {item.icon}
                      <span className="break-all text-muted-foreground transition-colors hover:text-foreground">
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="w-full min-w-0">
              <h2 className="bg-gradient-to-r from-primary to-[#e75e50] bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                Send a Message
              </h2>

              <div className="mt-2 h-[2px] w-20 rounded-full bg-gradient-to-r from-primary to-[#e75e50]" />

              <div
                className="
                  mt-5
                  w-full
                  min-w-0
                  overflow-visible
                  px-px

                  [&_form]:w-full
                  [&_form]:min-w-0

                  [&_input]:box-border
                  [&_input]:w-full
                  [&_input]:max-w-full
                  [&_input]:transition-[border-color,box-shadow]
                  [&_input]:duration-200
                  [&_input:hover]:border-primary/60
                  [&_input:focus]:border-primary
                  [&_input:focus-visible]:border-primary

                  [&_textarea]:box-border
                  [&_textarea]:w-full
                  [&_textarea]:max-w-full
                  [&_textarea]:transition-[border-color,box-shadow]
                  [&_textarea]:duration-200
                  [&_textarea:hover]:border-primary/60
                  [&_textarea:focus]:border-primary
                  [&_textarea:focus-visible]:border-primary
                "
              >
                <ContactForm />
              </div>
            </div>
          </div>

      <div
        role="note"
        className="
          relative z-10
          mt-6
          flex
          w-full
          min-w-0
          items-center
          justify-center
          gap-3
          rounded-lg
          border border-primary/20
          bg-primary/5
          px-4 py-3
          text-center
          text-sm
          font-semibold
          leading-relaxed
          text-foreground
          sm:mt-8
          sm:gap-4
          sm:px-5
          sm:text-base
          lg:mt-10
          lg:text-[12px]
        "
      >
        <AlertCircle
          className="h-5 w-5 shrink-0 text-primary"
          aria-hidden="true"
        />

        <p className="min-w-0">
          If you experience any difficulty submitting the form, please contact me
          directly by email or phone for prompt assistance.
        </p>
      </div>
        </div>
      </div>
    </section>
  );
}
