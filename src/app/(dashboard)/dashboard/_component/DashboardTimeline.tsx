
const DashboardTimeline = () => {
  return (
    <div className="flex flex-col  justify-between h-auto">
      <div
        style={{ borderBottom: ".5px solid gray" }}
        className="flex justify-between items-center"
      >
        <p className="text-secondary">Income</p>
        <span>+</span>
      </div>

      <div
        className="flex  shadow-lg  flex-column items-center justify-center mt-3"
        style={{
          border: "15px solid  #76ABAA",
          height: "200px",
          width: "200px",
          borderRadius: "50%",
          margin: "15px auto",
        }}
      >
        <p className="text-secondary  m-0" style={{ fontSize: "18px" }}>
          Percent
        </p>
        <p style={{ fontSize: "3rem" }} className="m-0 p-0">
          75
        </p>
      </div>

      <div className="mt-4">
        <div
          style={{ color: "goldenrod" }}
          className="flex items-center "
        >
          <span style={{ color: "goldenrod", fontSize: "28px" }}>32 %</span>
          <hr
            style={{ height: "6px", background: "goldenrod" }}
            className="flex-grow-1 ms-2"
          />
        </div>
        <p className="text-secondary">Spendings Terget</p>
      </div>
    </div>
  );
};

export default DashboardTimeline;