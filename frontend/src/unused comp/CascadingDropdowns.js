
import React, { useState } from "react";
import "../Css/CascadingDropdowns.css";

function CascadingDropdowns() {
  // Static options for the first dropdown
  const firstDropdownOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // Static options for the second dropdown
  const secondDropdownOptions = [
    {
      value: "subOption1",
      label: "Sub Option 1",
      thirdOptions: [
        { value: "nestedOption1", label: "Nested Option 1" },
        { value: "nestedOption2", label: "Nested Option 2" },
        { value: "nestedOption3", label: "Nested Option 3" },
      ],
    },
    {
      value: "subOption2",
      label: "Sub Option 2",
      thirdOptions: [
        { value: "nestedOption4", label: "Nested Option 4" },
        { value: "nestedOption5", label: "Nested Option 5" },
        { value: "nestedOption6", label: "Nested Option 6" },
      ],
    },
    {
      value: "subOption3",
      label: "Sub Option 3",
      thirdOptions: [
        { value: "nestedOption7", label: "Nested Option 7" },
        { value: "nestedOption8", label: "Nested Option 8" },
        { value: "nestedOption9", label: "Nested Option 9" },
      ],
    },
  ];

  const [selectedFirstValue, setSelectedFirstValue] = useState("");
  const [selectedSecondValue, setSelectedSecondValue] = useState("");
  const [selectedThirdValue, setSelectedThirdValue] = useState("");

  const handleFirstDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFirstValue(selectedValue);
    // Reset the values of the second and third dropdowns when the first dropdown changes
    setSelectedSecondValue("");
    setSelectedThirdValue("");
  };

  const handleSecondDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSecondValue(selectedValue);
    // Reset the value of the third dropdown when the second dropdown changes
    setSelectedThirdValue("");
  };

  const handleThirdDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedThirdValue(selectedValue);
  };

  return (
    <div class="dropdown">
      <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a class="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Submenu &raquo;
          </a>
          <ul class="dropdown-menu dropdown-submenu">
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 1
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 2
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 3 &raquo;{" "}
              </a>
              <ul class="dropdown-menu dropdown-submenu">
                <li>
                  <a class="dropdown-item" href="#">
                    Multi level 1
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Multi level 2
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 4
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 5
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default CascadingDropdowns;
