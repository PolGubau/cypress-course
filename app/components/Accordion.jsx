import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ItemsAccordion({ items }) {
	const getTestId = (id) => `accordion-item-${id}`;
	return (
		<div style={{ maxWidth: "70vw", minWidth: "50vw" }}>
			{items.map((item) => {
				return (
					<Accordion key={item.id} data-test={getTestId(item.id)}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							id="panel1a-header"
						>
							<Typography>{item.summary}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>{item.details}</Typography>
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
}
