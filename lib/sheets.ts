import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheets = google.sheets({ version: "v4", auth });
export const SPREADSHEET_ID = process.env.SPREADSHEET_ID!;

export type Rsvp = {
  name: string;
  attending: boolean;
  createdAt: string;
};

export type Item = {
  personName: string;
  item: string;
  createdAt: string;
};

function getGoogleApiStatus(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  const maybeError = error as { code?: unknown; status?: unknown };
  return typeof maybeError.code === "number" ? maybeError.code : maybeError.status;
}

function getSpreadsheetAccessError(error: unknown) {
  const status = getGoogleApiStatus(error);

  if (status === 404) {
    return new Error(
      "Planilha nao encontrada ou sem permissao para a service account. Confira o SPREADSHEET_ID e compartilhe a planilha com o email client_email do GOOGLE_SERVICE_ACCOUNT_JSON."
    );
  }

  return error;
}

export async function getRsvps(): Promise<Rsvp[]> {
  const res = await sheets.spreadsheets.values
    .get({
      spreadsheetId: SPREADSHEET_ID,
      range: "rsvps!A2:C",
    })
    .catch((error: unknown) => {
      throw getSpreadsheetAccessError(error);
    });

  const rows = res.data.values ?? [];
  return rows.map((row) => ({
    name: row[0] ?? "",
    attending: row[1] === "TRUE",
    createdAt: row[2] ?? "",
  }));
}

export async function addRsvp(name: string, attending: boolean): Promise<void> {
  await sheets.spreadsheets.values
    .append({
      spreadsheetId: SPREADSHEET_ID,
      range: "rsvps!A:C",
      valueInputOption: "RAW",
      requestBody: {
        values: [[name, String(attending).toUpperCase(), new Date().toISOString()]],
      },
    })
    .catch((error: unknown) => {
      throw getSpreadsheetAccessError(error);
    });
}

export async function getItems(): Promise<Item[]> {
  const res = await sheets.spreadsheets.values
    .get({
      spreadsheetId: SPREADSHEET_ID,
      range: "items!A2:C",
    })
    .catch((error: unknown) => {
      throw getSpreadsheetAccessError(error);
    });

  const rows = res.data.values ?? [];
  return rows.map((row) => ({
    personName: row[0] ?? "",
    item: row[1] ?? "",
    createdAt: row[2] ?? "",
  }));
}

export async function addItem(personName: string, item: string): Promise<void> {
  await sheets.spreadsheets.values
    .append({
      spreadsheetId: SPREADSHEET_ID,
      range: "items!A:C",
      valueInputOption: "RAW",
      requestBody: {
        values: [[personName, item, new Date().toISOString()]],
      },
    })
    .catch((error: unknown) => {
      throw getSpreadsheetAccessError(error);
    });
}
