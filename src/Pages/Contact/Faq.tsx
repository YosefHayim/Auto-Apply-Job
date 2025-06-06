import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { description, faqItems, heading, supportDescription, supportHeading } from "./faqItems";
import { useRef } from "react";

const Faq = () => {
  const topRef = useRef(null);

  return (
    <section className="w-full py-32">
      <div className="space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">{heading}</h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion type="single" collapsible className="mx-auto w-full lg:max-w-3xl">
          {faqItems?.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">{item.question}</div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">{item.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="bg-accent mx-auto flex max-w-4xl flex-col items-center rounded-lg p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          <div className="relative">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">{supportHeading}</h3>
          <p className="text-muted-foreground mb-8 max-w-3xl lg:text-lg">{supportDescription}</p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Talk with us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
