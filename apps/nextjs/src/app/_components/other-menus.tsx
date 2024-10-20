import { ArrowRight, CheckCircle, Star } from "lucide-react";

export const OtherMenus = () => (
  <section className="w-full bg-blue-900 py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="rounded-full bg-gray-100 p-4">
            <CheckCircle className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold">Easy Integration</h3>
          <p className="text-gray-500">
            Seamlessly integrate our solution with your existing tech stack.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="rounded-full bg-gray-100 p-4">
            <Star className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold">Powerful Analytics</h3>
          <p className="text-gray-500">
            Gain valuable insights with our advanced analytics tools.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="rounded-full bg-gray-100 p-4">
            <ArrowRight className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold">Scalable Solution</h3>
          <p className="text-gray-500">
            Our platform grows with your business, from startup to enterprise.
          </p>
        </div>
      </div>
    </div>
  </section>
);
