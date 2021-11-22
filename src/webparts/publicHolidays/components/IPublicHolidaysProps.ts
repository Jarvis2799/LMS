import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPublicHolidaysProps {
  description: string;
  context: WebPartContext;
  userid: string;
}
