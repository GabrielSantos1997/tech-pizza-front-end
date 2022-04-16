import React from "react";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import Colors from "../../assets/constants/Colors";

const Sorting = ({
    label,
    field,
    currentSortingField,
    setCurrentSortingField,
    currentSortingDirection,
    setCurrentSortingDirection,
    setSortingString,
}) => {
    const sort = field => {
        var direction = currentSortingDirection;
        if (field !== currentSortingField) {
            direction = false;
        }

        setCurrentSortingField(field);

        if (!direction) {
            setCurrentSortingDirection("ASC");
            setSortingString(`&sort=${field}&direction=ASC`);
        } else if (direction === "ASC") {
            setCurrentSortingDirection("DESC");
            setSortingString(`&sort=${field}&direction=DESC`);
        } else if (direction === "DESC") {
            setCurrentSortingDirection(false);
            setSortingString("");
        }
    };

    return (
        <button
            style={{ display: "flex", padding: 3, justifyContent: "space-between" }}
            type="button"
            onClick={() => sort(field)}>
            <span style={{ maxWidth: "min-content", paddingRight: 6 }}> {label} </span>

            {(currentSortingField !== field || currentSortingDirection === false) && <FaSort />}
            {currentSortingField === field && currentSortingDirection === "ASC" && <FaSortUp />}
            {currentSortingField === field && currentSortingDirection === "DESC" && <FaSortDown />}
        </button>
    );
};

export default Sorting;
