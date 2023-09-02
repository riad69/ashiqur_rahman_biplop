/* eslint-disable react/prop-types */
function SinglePerson({ d, length, closeName, closeProjectLink, projectBudget, bidValue }) {
  const dateString = d.deadline;
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const date = dateObject.getDate();
  const deadline = `${date}-${month}-${year}`;

  return (
    <tr>
      <td>
        <label className="flex">
          <input type="checkbox" className="checkbox" />
          <span className="flex">
            <span>{length + 1} </span>
          </span>
        </label>
      </td>
      {!closeName ? <td>{d?.client_name ? d?.client_name : ""} </td>: ""}
      {!closeProjectLink ? <td>
        <a
          href={d?.project_link ? d?.project_link : ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          {d?.project_link ? d?.project_link : ""}
        </a>
      </td>: ""}
      {!projectBudget ? <td>{`${d?.bid_value ? d?.bid_value : ""}-${
        d?.bid_value2 ? d?.bid_value2 : ""
      }`}</td>: ""}
      {!bidValue ? <td>{d?.value ? Math?.floor(d?.value) : ""}</td>: ""}
      <td>{deadline}</td>

      <td className="flex">
        <img src={d?.image_url ? d?.image_url : ""} alt={d?.client_name} />
        <span>{d?.id ? d?.id : ""}</span>
      </td>
      <td>{`${d?.bidding_minutes ? d?.bidding_minutes : ""} mins ${
        d?.bidding_seconds ? d?.bidding_seconds : ""
      } second`}</td>
      <td>
        {d?.deal_status ? (
          d?.deal_status == 0 ? (
            <button className="red">Not Complited to deal</button>
          ) : (
            <button className="green">Complited to deal</button>
          )
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}

export default SinglePerson;
