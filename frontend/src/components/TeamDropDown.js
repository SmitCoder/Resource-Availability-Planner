export const TeamDropDown = ({ handleDropdownChange, handleDropdownData, dropdownData }) => {
    return (
      <select
        className="team-selection"
        onClick={handleDropdownChange}
        onChange={handleDropdownData}
      >
        <option value="">Select Team</option>
        {dropdownData.map((item, index) => (
          <option key={index} value={item.Team_id}>
            {item.Name}{item.deptcode}
          </option>
        ))}
      </select>
    );
  };
  