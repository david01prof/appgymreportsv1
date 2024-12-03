import { IReport, IReportInfo } from "@app/models";

export const ReportAdapter = (reportInfo: IReportInfo): IReport[] => ( [...reportInfo.results])