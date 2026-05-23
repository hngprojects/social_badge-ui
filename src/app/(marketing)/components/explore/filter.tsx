"use client";

import { useState } from "react";

import FilterTabs from "./filter-tabs";
import TemplateGrid from "./template-grid";

const Filter = () => {
	const [activeFilter, setActiveFilter] = useState("All");

	return (
		<>
			<FilterTabs active={activeFilter} onChange={setActiveFilter} />

			<TemplateGrid activeFilter={activeFilter} />
		</>
	);
};

export default Filter;
