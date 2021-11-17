import * as React from 'react';
import styles from '../../employee/components/Employee.module.scss';
import { ILeaveProps } from './ILeaveProps';
// import { ILeaveState } from './ILeaveState';
import { IEmployeeState } from '../../employee/components/IEmployeeState';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPOperations } from '../../employee/Services/SPServices';
import { IDropdownOption, IChoiceGroupOption} from "office-ui-fabric-react";

export default class Leave extends React.Component<ILeaveProps, IEmployeeState, {}> {
  public _spOps: SPOperations;
  public selectedListTitle:string;
  public selectedListTitle2:string;
  public selectedLeaveSettings: string;
  
  constructor(props: ILeaveProps){
    super(props);
    this._spOps= new SPOperations();
    this.state= {listTitle:[], leaveSettings:[] ,status: "", sDate: "", items: [{id: "",
    user_id: "",
    start_date: "",
    end_date: "",
    type: "",
    cc: "",
    comment: "",
    status: "",
    days: ""}],
    bal: [{
      id: "",
      text: ""
    }]
  };
  }
public getListTitle=(event:any, data:any)=>{
  this.selectedListTitle=data.text;
}
public getLeaveSettings=(event:any, data:any)=>{
  this.selectedLeaveSettings=data.text;
}
public getListTitle2=(event:any, data:any)=>{
  this.selectedListTitle2=data.text;
}
public componentDidMount(){
  this._spOps.GetAllHolidayList(this.props.context).then((result:IDropdownOption[])=>{
    this.setState({listTitle:result}); });

    fetch("https://contosofunctions.azurewebsites.net/api/getitem/")
    .then((res) => res.json())
    .then((json) => {
    this.setState({items: json});
    });
  
  this._spOps.GetAllLeaveSettings(this.props.context).then((result:IChoiceGroupOption[])=>{
    this.setState({leaveSettings: result});
  });
}

  public render(): React.ReactElement<ILeaveProps> {

    const check= escape(this.props.userid);
    const print2= this.state.leaveSettings.map(item=><p>{item.text}</p>);

    var start: JSX.Element[]= [], end: JSX.Element[]= [], type: JSX.Element[]= [], days: JSX.Element[]= [], cc: JSX.Element[]= [], comment: JSX.Element[]= [], status: JSX.Element[]= [];

    if (this.state.items.length) {
      this.state.items.map((item) => { 
        if (item.user_id ===check.toString()) {start.push(<p key= {item.id}>{item.start_date}</p>) , 
        end.push(<p key= {item.id}>{item.end_date}</p>), type.push(<p key= {item.id}>{item.type}</p>), 
        cc.push(<p key= {item.id}>{item.cc}</p>), comment.push(<p key= {item.id}>{item.comment}</p>), 
        status.push(<p key= {item.id}>{item.status}</p>), days.push(<p key= {item.id}>{item.days}</p>)};
        }
        );
    }

    this.state.leaveSettings.map((item)=>{
      this.state.bal.push({id: item.text, text: item.key});
    })

    if (this.state.items.length) {
      this.state.items.map((item) => { 
        if (item.user_id ===check.toString()) {
          this.state.leaveSettings.map((newItem)=>{
            this.state.bal.map((nItem)=>{
            if(item.status==="approved".toString() && item.type.toString()===newItem.text.toString() && nItem.id===item.type){
                nItem.text= (parseInt(nItem.text)- parseInt(item.days)).toString();
              }})})
      }
    });
    }

    const balance= this.state.bal.map((item)=><p>{item.text}</p>);

    return (
      <div className={ styles.employee }>
          <div className={styles.container}>
      
<div className={styles.grid}>
  <div className={styles.gridRow}>
  <div className={styles.smallCol}>
      Leave Type
    </div>
    <div className={styles.largeCol}>
      Number of Days
    </div>
    <div className={styles.smallCol}>
      {print2}
    </div>
    <div className={styles.largeCol}>
        {balance}
    </div>
  </div>
  </div>
        </div>
      </div>
    );
  } 
}