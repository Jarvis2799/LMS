import { IDropdownOption, ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react";



export interface IEmployeeState{

    listTitle: IDropdownOption[];

    status: string;

    leaveSettings: IChoiceGroupOption[];

    sDate: string;

    items: [{id: "",
    user_id: "",
    start_date: "",
    end_date: "",
    cc: "",
    type: "",
    comment: "",
    status: ""}] ;

    creds: [{text:""}];
}