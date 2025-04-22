import image1 from "../../../public/HomepageSection1/78.png";
import image2 from "../../../public/HomepageSection1/79.png";
import image3 from "../../../public/HomepageSection1/80.png";
export default function Section1() {
  return (
    <div className="my-15">
      <div className="flex items-center justify-center p-2 bg-gray-50 rounded-md max-w-xs width-90">
        <span className="mr-2 text-orange-500 font-medium">For artisans</span>
        <div className="relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out bg-orange-500 rounded-full">
          <div className="absolute right-1 top-1 w-4 h-4 transition-transform duration-200 ease-in-out bg-white rounded-full"></div>
        </div>
        <span className="ml-2 text-gray-400 font-medium">For customers</span>
      </div>
      <div className="text-center h1-headline my-8">
        <h1>
          More orders. <br /> More sales
        </h1>
      </div>
      <div style={{ height: "50vh" }} className="relative h-full w-full  ">
        <div className="mx-auto max-w-6xl">
          <div className="absolute right-4 top-4 md:right-8 md:top-8 lg:right-12 lg:top-12">
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={image1}
                  alt="Service provider"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-2 rounded-full bg-green-500   text-xs text-white">
                Now available
              </div>
            </div>
          </div>

          <div className="absolute left-8 top-1/2 -translate-y-1/2 md:left-16">
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={image2}
                  alt="Repair service"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 right-0 text-blue-500 font-medium">
                repair
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16">
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={image3}
                  alt="Service rating"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 text-yellow-200 font-bold">
                4 . 8
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
