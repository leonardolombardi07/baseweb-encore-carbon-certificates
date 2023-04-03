"use client";

import { HeadingLevel, Heading as BaseUIHeading } from "baseui/heading";
import { StyledDivider } from "baseui/divider";
import React from "react";
import { MessageCard } from "baseui/message-card";
import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  NumericalColumn,
  StringColumn,
  COLUMNS,
  NUMERICAL_FORMATS,
} from "baseui/data-table";
import { useStyletron } from "@/styles";
import { useRouter } from "next/navigation";

function Heading() {
  return (
    <HeadingLevel>
      <BaseUIHeading styleLevel={3}>Bem-vindo de volta, Leonardo</BaseUIHeading>
      <StyledDivider style={{ margin: "0.5em 0 1em" }} />
    </HeadingLevel>
  );
}

function Cards() {
  const route = useRouter();
  return (
    <React.Fragment>
      <MessageCard
        heading="Atualize sua Conta"
        buttonLabel="Atualizar conta"
        onClick={() => route.push("/plans")}
        paragraph="Aproveite a promoção e obtenha sua conta Premium. Com ela você pode receber previsões financeiras da emissão de carbono e relatórios personalizados com recomendações."
        image={{
          src: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
          ariaLabel: "hey",
        }}
        overrides={{
          Root: { props: { $as: "div" } },
        }}
      />
    </React.Fragment>
  );
}

// https://gist.github.com/6174/6062387
function pseudoRandomString(rowIdx: any, columnIdx: any) {
  return (
    (0.88 * rowIdx).toString(36).replace(".", "").substring(2) +
    (0.99 * columnIdx).toString(36).replace(".", "")
  ).slice(0, 10);
}
function makeRowsFromColumns(columns: any, rowCount: number) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      id: i,
      data: columns.map((column: any, j: number) => {
        switch (column.kind) {
          case COLUMNS.CATEGORICAL:
            switch (i % 5) {
              case 4:
                return "A";
              case 3:
                return "B";
              case 2:
                return "C";
              case 1:
                return "D";
              case 0:
              default:
                return "F";
            }
          case COLUMNS.NUMERICAL:
            return i % 2 ? i - 1 : i + 3;
          case COLUMNS.BOOLEAN:
            return i % 2 === 0;
          case COLUMNS.STRING:
            return pseudoRandomString(i, j);
          case COLUMNS.CUSTOM:
            switch (i % 5) {
              case 4:
                return { color: "red" };
              case 3:
                return { color: "green" };
              case 2:
                return { color: "blue" };
              case 1:
                return { color: "purple" };
              case 0:
              default:
                return { color: "yellow" };
            }
          default:
            return "default" + pseudoRandomString(i, j);
        }
      }),
    });
  }
  return rows;
}
type RowDataT = [
  string,
  string,
  number,
  number,
  number,
  { color: string },
  boolean,
  string
];
const columns = [
  CategoricalColumn({
    title: "categorical",
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  StringColumn({
    title: "string",
    mapDataToValue: (data: RowDataT) => data[1],
  }),
  NumericalColumn({
    title: "three",
    mapDataToValue: (data: RowDataT) => data[2],
  }),
  NumericalColumn({
    title: "neg std",
    highlight: (n: number) => n < 0,
    mapDataToValue: (data: RowDataT) => data[3],
  }),
  NumericalColumn({
    title: "accounting",
    format: NUMERICAL_FORMATS.ACCOUNTING,
    mapDataToValue: (data: RowDataT) => data[4],
  }),
  CustomColumn<{ color: string }, {}>({
    title: "custom color",
    mapDataToValue: (data: RowDataT) => data[5],
    renderCell: function Cell(props: any) {
      const [css] = useStyletron();
      return (
        <div
          className={css({
            alignItems: "center",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: "flex",
          })}
        >
          <div
            className={css({
              backgroundColor: props.value.color,
              height: "12px",
              marginRight: "24px",
              width: "12px",
            })}
          />
          <div>{props.value.color}</div>
        </div>
      );
    },
  }),
  BooleanColumn({
    title: "boolean",
    mapDataToValue: (data: RowDataT) => data[6],
  }),
  CategoricalColumn({
    title: "second category",
    mapDataToValue: (data: RowDataT) => data[7],
  }),
];
const rows = makeRowsFromColumns(columns, 100);

function DataTable() {
  const [css] = useStyletron();
  return (
    <div className={css({ height: "800px" })}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
}

export { Heading, Cards, DataTable };
