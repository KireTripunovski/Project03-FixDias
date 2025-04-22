export default function Section2() {
  return (
    <div className="my-15">
      <h2 className="h1-headline text-center">Why people like us</h2>
      <img
        style={{ marginLeft: "185px", marginTop: "15px" }}
        src="../../../public/HomepageSection1/Vector.png"
        alt="../../../public/HomepageSection1/Vector.png"
      />
      <div>
        <div className="flex items-center gap-2 mb-[10px]">
          <img
            src="../../../public/HomepageSection1/check.png"
            alt=""
            className="w-6 h-6 object-contain"
          />
          <p className="b3-body">
            No hidden costs: only a transparent monthly fee
          </p>
        </div>
        <div className="flex items-center gap-2 mb-px">
          <img
            src="../../../public/HomepageSection1/check.png"
            alt=""
            className="w-6 h-6 object-contain"
          />
          <p className="b3-body">
            Targeted orders: Find jobs that fit your skills.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="../../../public/HomepageSection1/check.png"
            alt=""
            className="w-6 h-6 object-contain"
          />
          <p className="b3-body">
            Immediate bookings: Communicate directly with customers in chat.
          </p>
        </div>
      </div>
    </div>
  );
}
