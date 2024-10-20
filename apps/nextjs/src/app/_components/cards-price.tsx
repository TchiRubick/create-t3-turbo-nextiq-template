import { CheckCircle } from "lucide-react";

import { getSection } from "@acme/cms";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

export const CardsPrice = () => {
  const section = getSection("price-section");

  const cardContainerClassName = (index: number) =>
    cn("flex flex-col justify-between rounded-lg border p-6 shadow-lg", {
      "flex flex-col justify-between rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg":
        index === 1,
    });

  const buttonClassName = (index: number) =>
    cn("w-full bg-white text-gray-900 hover:bg-gray-500", {
      "w-full bg-slate-950 hover:bg-slate-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-500":
        index === 1,
    });

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {section["main-title"]}
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {section["title-description"]}
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-12">
          {section["price-list"].map((priceList, index) => (
            <div
              className={cardContainerClassName(index)}
              key={priceList.title}
            >
              <div>
                <h3 className="text-center text-2xl font-bold">
                  {priceList.title}
                </h3>
                <div className="mt-4 text-center text-gray-500">
                  <span className="text-4xl font-bold">{priceList.price}</span>/{" "}
                  {priceList.unity}
                </div>
                <ul className="mt-4 space-y-2">
                  {priceList.features.map((feature) => (
                    <li className="flex items-center" key={feature.value}>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      {feature.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Button className={buttonClassName(index)}>
                  {priceList.button}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <span className="text-xs italic text-muted-foreground">
            {section.note}
          </span>
        </div>
      </div>
    </section>
  );
};
