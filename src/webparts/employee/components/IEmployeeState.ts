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
    type: "",
    cc: "",
    comment: "",
    status: "",
    days: ""}] ;

    bal: [{
        id: string,
        text: string
      }];
}