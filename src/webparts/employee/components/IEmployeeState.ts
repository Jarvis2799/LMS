import { IDropdownOption, ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react";



export interface IEmployeeState{

    listTitle: IDropdownOption[];

    status: string;

    leaveSettings: IChoiceGroupOption[];

    sDate: string;

}