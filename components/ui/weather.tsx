const WeatherTable: React.FC = () => {
  const tableUrl = "https://www.yr.no/en/content/1-159947/table.html";

  return (
    <iframe
      src={tableUrl}
      title="Weather Table"
      style={{ width: "100%", height: "600px", border: "none" }}
    />
  );
};

export default WeatherTable;
