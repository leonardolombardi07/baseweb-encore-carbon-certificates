"use client";

import React from "react";
import { Segment } from "@/components/surfaces/Segment";
import { HeadingMedium, ParagraphMedium } from "baseui/typography";
import { Process } from "@/data";
import {
  StatefulDataTable,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
} from "baseui/data-table";

type RowDataT = {
  title: string;
  details: string;
  status: "running" | "failed" | "certified";
  co2Emission: number;
};

const details = `"We went upstairs together, the colonel first with the lamp, the fat manager and I behind him. It was a labyrinth of an old house, with corridors, passages, narrow winding staircases, and little low doors, the thresholds of which were hollowed out by the generations who had crossed them. There were no carpets and no signs of any furniture above the ground floor, while the plaster was peeling off the walls, and the damp was breaking through in green, unhealthy blotches. I tried to put on as unconcerned an air as possible, but I had not forgotten the warnings of the lady, even though I disregarded them, and I kept a keen eye upon my two companions. Ferguson appeared to be a morose and silent man, but I could see from the little that he said that he was at least a fellow-countryman.`;
const columns = [
  StringColumn({
    title: "Certificação",
    mapDataToValue: (data: RowDataT) => data.title,
    cellBlockAlign: "center",
  }),
  CategoricalColumn({
    title: "Status",
    mapDataToValue: (data: RowDataT) => data.status,
    cellBlockAlign: "center",
  }),
  NumericalColumn({
    title: "Emissão de Carbono (kt)",
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data.co2Emission,
    cellBlockAlign: "center",
  }),
  StringColumn({
    title: "Detalhes",
    maxWidth: 400,
    lineClamp: 3,
    mapDataToValue: (data: RowDataT) => data.details,
  }),
];

const rows: RowDataT[] = [
  {
    title: "Maquinário",
    details,
    status: "certified",
    co2Emission: 237,
  },
  {
    title: "Transportes",
    details,
    status: "running",
    co2Emission: 29,
  },
  {
    title: "Logística",
    details,
    status: "failed",
    co2Emission: 185,
  },
  {
    title: "Tripulação",
    details,
    status: "running",
    co2Emission: 11,
  },
];

const rowsWithId = rows.map((r) => ({ id: r.title, data: r }));

function Table() {
  return (
    <Segment>
      <div style={{ height: "500px" }}>
        <StatefulDataTable columns={columns} rows={rowsWithId} rowHeight={70} />
      </div>
    </Segment>
  );
}

// function Tasks(props: { tasks: any[] }) {
//   const [css] = useStyletron();
//   return (
//     <div
//       className={css({
//         gridColumn: "span 5",
//         padding: "32px 24px",
//       })}
//     >
//       <StyledTable
//         role="grid"
//         $gridTemplateColumns="max-content auto auto auto"
//       >
//         <div role="row" className={css({ display: "contents" })}>
//           <StyledHeadCell $sticky={false}>Task</StyledHeadCell>
//           <StyledHeadCell $sticky={false}>Status</StyledHeadCell>
//           <StyledHeadCell $sticky={false}>Last Run</StyledHeadCell>
//           <StyledHeadCell $sticky={false}>Details</StyledHeadCell>
//         </div>
//         {props.tasks.map((task) => {
//           return (
//             <div
//               key={`Date.now()${task[0]}`}
//               role="row"
//               className={css({ display: "contents" })}
//             >
//               <StyledBodyCell>{task[0]}</StyledBodyCell>
//               <StyledBodyCell>
//                 <Tag
//                   closeable={false}
//                   variant="outlined"
//                   kind={statusToTagKind(task[1])}
//                 >
//                   {task[1]}
//                 </Tag>
//               </StyledBodyCell>
//               <StyledBodyCell>
//                 {format(task[2], "yyyy-MM-dd h:mm a")}
//               </StyledBodyCell>
//               <StyledBodyCell>
//                 <StyledLink href={task[4]}>{task[3]}</StyledLink>
//               </StyledBodyCell>
//             </div>
//           );
//         })}
//       </StyledTable>
//     </div>
//   );
// }

function MainInfo(process: Process) {
  const { name, description } = process;
  return (
    <Segment style={{ marginBottom: "1em" }}>
      <HeadingMedium>{name}</HeadingMedium>
      <ParagraphMedium>{description}</ParagraphMedium>
    </Segment>
  );
}

export { Table, MainInfo };
