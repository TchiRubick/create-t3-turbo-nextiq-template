import { Button } from "@acme/ui/button";

export const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              The Ultimate SaaS Landing Page
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Boost your SaaS product's online presence with our stunning,
              conversion-optimized landing page template.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="bg-gray-900 text-white">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
