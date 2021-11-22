import * as React from "react";
//import styles from "./PublicHolidays.module.scss";
import styles from "../../employee/components/Employee.module.scss";
import { IPublicHolidaysProps } from "./IPublicHolidaysProps";
import { IEmployeeState } from "../../employee/components/IEmployeeState";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPOperations } from "../../employee/Services/SPServices";
import {
  ChoiceGroup,
  format,
  IChoiceGroupOption,
  IDropdownOption,
  Label,
  Pivot,
  PivotItem,
  PrimaryButton,
  TextField,
} from "office-ui-fabric-react";

export default class PublicHolidays extends React.Component<
  IPublicHolidaysProps,
  IEmployeeState,
  {}
> {
  public _spOps: SPOperations;
  public selectedListTitle: string;

  constructor(props: IPublicHolidaysProps) {
    super(props);
    this._spOps = new SPOperations();
    this.state = {
      listTitle: [],
      leaveSettings: [],
      status: "pending",
      sDate: "",
      emailCc: "",
      reason: "",
      eDate: "",
      leaveType: "",
      errorLeaveType: "",
      errorStartDate: "",
      errorEndDate: "",
      errorReason: "",
      errorEmail: "",

      dataBaseExtracts: [
        {
          id: "",
          user_id: "",
          start_date: "",
          end_date: "",
          type: "",
          cc: "",
          comment: "",
          status: "",
          days: "",
        },
      ],

      leaveBalance: [{ id: "", text: "" }],
      publicHolidays: [""],
      submitSuccess: "",
    };

    //console.log(this.state);
  }

  public componentDidMount() {
    this._spOps
      .GetAllHolidayList(this.props.context)
      .then((result: IDropdownOption[]) => {
        this.setState({ listTitle: result });
      });
  }

  //validating the form

  //submitting the form data

  public render(): React.ReactElement<IPublicHolidaysProps> {
    fetch("https://contosofunctions.azurewebsites.net/api/getitem/?code=eV2X5cNfC7kSd4UQB/O1bmf1Q0AyYMCH3Oj5ZFZI1nL9pB6pZwTgvQ==&clientId=contoso-key")
      .then((res) => res.json())
      .then((json) => {
        this.setState({});
      });

    const printHolidayName = this.state.listTitle.map((item) => (
      <p>{item.text}</p>
    ));
    const printHolidayDate = this.state.listTitle.map((item) => (
      <p>{item.key.toString().substr(0, 10)}</p>
    ));

    return (
      <div className={styles.employee}>
        <div className={styles.container}>
          <div className={styles.heading}>Public Holidays</div>
          <div className={styles.grid}>
            <div className={styles.gridRow}>
              <div className={styles.gridHeading1}>
                <p>Occasion</p>
              </div>
              <div className={styles.gridHeading2}>
                <p>Date</p>
              </div>
              <div className={styles.smallCol}>{printHolidayName}</div>
              <div className={styles.largeCol}>{printHolidayDate}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
